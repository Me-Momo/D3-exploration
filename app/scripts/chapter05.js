var dataset = [3, 2, 10, 20, 5]

// 1. 生成页面元素 
// d3.select("body").append("p").text("Hello")

// 2. Five times "Hello" ,since the length of dataset is five
// d3.select("body").selectAll("p").data(dataset).enter().append("p").text("Hello")

// 3. use d3.csv
// doc: https://github.com/d3/d3/wiki/%E8%AF%B7%E6%B1%82#csv
// d3.csv("./data/food.csv", function(data) {
//     console.dir(data)
//     // Array(6) [{Deliciousness:"",Food:""},,,,,]
// })

// 4. 数据需要拥抱， 需要使用function 而不是直接引入 
// 5. creating_paragraphs_with_style_functions
d3.select("body").selectAll("p").data(dataset).enter().append("p")
    .text( function(d){
        return "I can count to " + d
    })
    .style("color", function(d){
        if(d>10){
            return "red"
        }
    })

// 6. 查看一下数据的绑定和确定
console.log(d3.selectAll("p"))
