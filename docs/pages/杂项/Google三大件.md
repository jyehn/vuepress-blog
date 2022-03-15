# MapReduce

MapReduce是一个编程模型，也是一个处理和生成大规模数据的实现。用户指定一个map函数，处理每一个key/value键值对生成中间类型的键值对，以及一个reduce函数用于合并所有的相同key的中间类型键值对。许多现实世界的任务都是用这个模型描述的。

## MapReduce的编程模型

例子

伪代码

```
map(String key, String value):
	//key :document name
	//value: document contents
	for each word w in value:
		EmitIntermediate(w, "1");
reduce(String key, Iterator values):
	//key :a word
	//values: a list of counts
	int result = 0;
	for each v in values:
		result += ParseInt(v);
	Emit(AsString(result));
```

类型

虽然以上的伪代码输入输出是string类型，但是概念上来说用户提供的map和reduce函数是有关联的类型的

map	        (k1,  v1)        ----->list(k2, v2)

reduce        (k2,  list(v2)) ---->list (v2)

输入和输出键值对来自不同的域。中间键值对和输出键值对来自相同的域

## MapReduce的执行过程

通过自动把输入数据分成M份的集合, Map的调用被分散在几个机器上 。这个拆分的过程可以通过不同的机器并行执行。通过使用分块函数把中间键空间分成R块（例如`hash(key) mod R`）， Reduce的调用被分散。分块次数（R）和分块函数由用户指定

当用户调用MapReduce函数，以下行为将会发生。

1. 在用户程序里的MapReduce库会先吧输入文件拆分成M块，通常是16M到64M的大小（用户可以通过参数调节）。接下来，集群机器上的很多个拷贝程序就会开始工作了。
2. 这些程序拷贝中的一个是特殊的，就是master机器上的。其余的worker都是由master安排工作的。一共有M个map任务和R个reduce任务要安排。master挑选空闲的worker，然后给每一个安排map任务或者reduce任务。
3. 被安排map任务的worker读入对应输入拆分的内容。它处理生成了键值对，把每个键值对传递给用户定义的map函数。由map函数产生的中间键值对被缓存在内存中
4. 周期性的，缓存的键值对被写入本地磁盘，由分块函数分成R个区域。这些缓存的键值对的位置被传递回master，master负责分发这些位置给做reduce的workers
5. 当一个reduce的worker被master通知这些位置的时候，它使用remote procedure call来从map worker的本地磁盘读取缓存的数据。当一个reduce worker已经读完了所有的中间数据，她就把这些按照中间键排序，以使得所有相同键被合并在一起。之所以需要排序，是因为通常，由多个不同的key被map到一个相同的reduce任务，如果中间数据的数量太大难以在内存中放下，就需要使用外部排序了
6. reduce worker,遍历排序过的中间数据，对于每一个独特的中间键，它把键和对应的中间值传递给用户的Reduce函数。Reduce函数的输出被添加到最终的对于此次reduce分块的输出文件
7. 当所有别的map任务和reduce任务都完成的时候，master唤醒用户程序。在此时，mapReduce调用用户程序返回到用户代码

这一个流程成功完成后，mapReduce执行结果的输出就是R个输出文件（每个reduce 任务一个，文件名称由用户指定）。通常，用户不需要把这R个文件合并成一个文件。他们通常把这些文件作为另一个MapReduce调用的输入，或者在另一个可以处理被分成多个文件的分布式应用中。

### Master的数据结构

对于每个map任务和reduce任务，它存储了状态（空闲，进行中，已完成）和每个worker机器的身份(对于空闲状态的任务)

master是map任务传递中间文件区域到reduce任务的中转。因此，对于每个完成的map任务，master存储R个由map任务产生的中间文件区域。当map任务完成的时候，这些位置和大小的信息的更新就会被master接收到。这些信息被增量式地推送到有正在执行的reduce任务的workers。

### 容错性

#### work出错

master会周期性的ping每个worker。如果在一定时间内，没有收到一个worker的相应，那么master就把worker标记成失败。任何一个由该worker完成的map任务都会被重置到它的空闲状态，因此就可以安排在其他的worker上运行。相似的，在一个失败的worker上的任何一个进行中的map或者reduce任务都会被重置到空闲状态，可以被安排调度。

在失败worker上的已经完成的map任务需要被重新执行的原因是他们存储在本地磁盘的输出已经不可获取了。已经完成的reduce任务不需要重新执行，是因为他们的输出已经被存储在全局的文件系统中了。

当一个map任务开始由worker A执行然后由worker B执行（因为A失败了），所有的执行reduce任务的worker都会被通知这次重新执行。任何没有读取过worker A数据的reduce任务将会从worker B中读取数据





## MapReduce的改进

