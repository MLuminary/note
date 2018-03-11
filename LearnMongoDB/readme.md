# LearnMongoDB

## 概述

>MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

>MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

## 特点

高扩展性、分布式存储、低成本、结构灵活

## Windows下 MongoDB 安装和环境搭建

官网下载地址 https://www.mongodb.com/download-center?jmp=nav#community

![pg1](image/pg1.png)

windows 64 的直接点击下载即可，windows 32 的需要下载 3.2的版本，可以到绿色按钮下方 [All Version Binaries](https://www.mongodb.org/dl/win32/x86_64-2008plus-ssl?_ga=2.10785079.249038257.1520656142-372372817.1520656142) 中下载

一步步安装，模式的时候选择顾客版，按默认位置下载即可

我因为有强迫症，我下载的东西都不会下载到 c 盘，所以我还是把他安装到了 D 盘。路径就是根目录 D 盘。然后我在 MongoDB 文件夹的旁边建了一个 MongoDBR 的文件夹，这个名字无所谓。然后下面是文件的具体配置 

在d:\MongoDBR（可随意起）下面建一个data文件夹

在d:\MongoDBR（可随意起）下面建一个logs文件夹，在里面建一个文件mongo.log

在d:\MongoDBR（可随意起）下面建一个etc(随意起，放配置文件)文件夹，在里面建一个文件 mongo.conf

打开mongo.conf文件，添加如下字段：

```conf
#数据库路径

dbpath=c:\MongoDB\data\
#日志输出文件路径

logpath=c:\MongoDB\logs\mongodb.log
#错误日志采用追加模式，配置这个选项后mongodb的日志会追加到现有的日志文件，而不是从新创建一个新文件

logappend=true
#启用日志文件，默认启用

journal=true
#这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false

quiet=false
#端口号 默认为27017

port=27017
#指定存储引擎（默认先不加此引擎，如果报错了，大家在加进去）

storageEngine=mmapv1
```

完成以上操作后，我们就可以启动我们的 mongo 数据库了。

然后用管理员权限运行 cmd ，运行如下代码

```shell
mongod --dbpath c:\MongoDB\data
```

以上代码只是启动 MongoDB 的服务，如果想要使用 mongoDB 需要再打开另一个 cmd 进入到 MongoDB\bin 中运行 mongo 来连接 mongoDB ，当然，毕竟这样太麻烦

因此可以使用下面代码，在进入 MongDB\bin 中输入

```shell
mongod --dbpath d:\MongoDBR\data --logpath d:\MongoDBR\log\mongo.log --journal
```

这样就会自动开启服务

![pg2](image/pg2.png)

不想影响开机时间可以设置为自动延迟，另外，现在下载 mongoDB 会自带一个 MongoDB Compass 工具，开启 MongoDB 服务后，直接连接就可以，具体使用接下来再说~

## MongoDB 概念解析

|SQL术语/概念 |	MongoDB术语/概念 |解释/说明|
|-----|-----|-----|
|database	|database|	数据库|
|table	|collection|	数据库表/集合|
|row	|	document	|	数据记录行/文档	|
|column	|	field	|	数据字段/域	|
|index	|	index	索引	|
|table joins		 	表连接,MongoDB不支持|
|primary key|	primary key|	主键,MongoDB自动将_id字段设置为主键|


### 创建用户

无密码无账户连接进去的 MongoDB 数据库有一些权限是没有的，需要有一个具有 `root` 权限的账户登录进去

```shell
> db.createUser({user:"hutchins",pwd:"hutchins","roles":["root"]})
Successfully added user:{"user":"hutchins","roles":["root"]}
> db.auth("hutchins","hutchins")
1
```

然后以这种方法登录数据库就是最高的权限

### 数据库

`show dbs` 可以查看当前所有的数据库

`db` 可以显示当前数据库对象或集合

`use` 命令可以连接到一个指定的数据库

#### 数据库创建

MongoDB 创建数据库的语法

`use databaseName`

如果数据库不存在，则创建数据库，否则切换到指定数据库

```shell
> use demo
switched to db demo
> db
demo
```

但是这样数据库并没有创建成功，如果没有插入数据的话，此数据库还是不存在的

```shell
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

你可以选择创建集合

```shell
> db.createCollection('user')
{ "ok" : 1 }
> show collections
user
> show dbs
admin   0.000GB
config  0.000GB
demo    0.000GB
local   0.000GB
```

#### 数据库删除

数据库的删除命令

```shell
> db.dropDatabase()
{ "dropped" : "demo", "ok" : 1 }
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

#### 集合的创建
 
MongoDB 中集合的创建

```shell
db.createCollection(name, options)
```

- `name` : 集合的名字
- `options` : 可选参数，指定有关内存大小及索引的选项


|字段|	类型|	描述|
|----|----|----|
|capped|	布尔|	（可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。<br>当该值为 true 时，必须指定 size 参数。|
|autoIndexId|	布尔|	（可选）如为 true，自动在 _id 字段创建索引。默认为 false。|
|size|	数值|	（可选）为固定集合指定一个最大值（以字节计）。|
|如果| capped| 为 true，也需要指定该字段。|
|max|	数值|	（可选）指定固定集合中包含文档的最大数量。|

在 `test` 数据库中创建 `runoob` 集合：

```shell
> use test
switched to db test
> db.createCollection("runoob")
{ "ok" : 1 }
>
```

如果要查看已有集合，可以使用 `show collections` 命令：

```shell
> show collections
runoob
```

下面是带有几个关键参数的 `createCollection()` 的用法：

创建固定集合 `mycol`，整个集合空间大小 `6142800 KB`, 文档最大个数为 `10000` 个。

```shell
> db.createCollection("mycol", { capped : true, autoIndexId : true, size : 
   6142800, max : 10000 } )
{ "ok" : 1 }
>
```

在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合。

```shell
> db.mycol2.insert({"name" : "hutchins"})
> show collections
mycol2
```

#### 集合的删除

语法格式

```shell
db.collection.drop()
```

删除成功返回 `true` ,删除失败返回 `false` 

可以通过 `show collections` 查看存在的集合

#### 插入文档

使用 `insert()` 或 `save()` 方法向集合中插入文档

```shell
db.collectionName.insert(document)
```

插入文档你也可以使用 `db.col.save(document)` 命令。如果不指定 `_id` 字段 `save()` 方法类似于 `insert()` 方法。如果指定 `_id` 字段，则会更新该 `_id` 的数据。

3.2 版本后还有以下几种语法可用于插入文档:

`db.collection.insertOne():` 向指定集合中插入一条文档数据
`db.collection.insertMany():` 向指定集合中插入多条文档数据

```shell
> var document = db.collection.insertOne({"a": 3})
> document
{
        "acknowledged" : true,
        "insertedId" : ObjectId("571a218011a82a1d94c02333")
}
```

```shell
> var res = db.collection.insertMany([{"b": 3}, {'c': 4}])
> res
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("571a22a911a82a1d94c02337"),
                ObjectId("571a22a911a82a1d94c02338")
        ]
}
```

#### 更新文档

更新已存在的文档

```shell
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```

- `query` : update的查询条件，类似sql update查询内where后面的。
- `update` : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- `upsert` : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- `multi` : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- `writeConcern` :可选，抛出异常的级别。

我们在集合 col 中插入如下数据：

```shell
>db.col.insert({
    title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```

接着我们通过 `update()` 方法来更新标题 `title` :

```shell
>db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })   # 输出信息
> db.col.find().pretty()
{
        "_id" : ObjectId("56064f89ade2f21f36b03136"),
        "title" : "MongoDB",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
>
```

可以看到标题 `title` 由原来的 `"MongoDB 教程"` 更新为了 `"MongoDB"`。


`save()` 方法通过传入的文档来替换已有文档。语法格式如下：

```shell
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```

参数说明：

- `document` : 文档数据。
- `writeConcern` :可选，抛出异常的级别。

实例

以下实例中我们替换了 `_id` 为 `56064f89ade2f21f36b03136` 的文档数据：

```shell
>db.col.save({
    "_id" : ObjectId("56064f89ade2f21f36b03136"),
    "title" : "MongoDB",
    "description" : "MongoDB 是一个 Nosql 数据库",
    "by" : "Runoob",
    "url" : "http://www.runoob.com",
    "tags" : [
            "mongodb",
            "NoSQL"
    ],
    "likes" : 110
})
```

$set

用来指定一个键并更新键值，若键不存在并创建.

#### 删除文档

`remove()` 方法已经过时了，现在官方推荐使用 `deleteOne()` 和 `deleteMany()` 方法。

如删除集合下全部文档：

```shell
db.inventory.deleteMany({})
```

删除 `status` 等于 `A` 的全部文档：

```shell
db.inventory.deleteMany({ status : "A" })
```

删除 `status` 等于 `D` 的一个文档：

```shell
db.inventory.deleteOne( { status: "D" } )
```

#### 查询文档

```shell
db.collection.find(query, projection)
```

- `query` ：可选，使用查询操作符指定查询条件
- `projection` ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

如果你需要以易读的方式来读取数据，可以使用 `pretty()` 方法，语法格式如下：

```shell
>db.col.find().pretty()
```