var subreddit = document.querySelector("#subreddit");
var btn = document.getElementById("btn");
var subRList = document.querySelector("#rLists");

btn.addEventListener("click" , function() 
{
    var url = "https://www.reddit.com/" + subreddit.value + ".json";
    var get = new XMLHttpRequest();
    get.open("GET" , url);
    get.onload = function() 
    {
        if(get.status >= 200 && get.status < 400)
        {
            var dataRec = JSON.parse(get.responseText);
            dispRandom(dataRec);
        }
    };
    get.send();
});

function dispRandom(data)
{
    console.log(data);
    var newSubR = document.createElement("h1");
    newSubR.className = "list-item title has-text-success";
    newSubR.innerHTML = "from " + subreddit.value + " :";
    subRList.appendChild(newSubR);

    var list = document.createElement("div");
    list.className = "list is-hoverable";

    var posts = data["data"]["children"];

    for(var i=0 ; i<posts.length ; i++)
    {
        var curpost = posts[i]["data"];
        var postLink = curpost["url"]

        var nextPost = document.createElement("div");
        nextPost.className = "list-item";
        
        var link = document.createElement("a");
        link.className = "is-size-4";
        link["href"] = postLink;
        link.innerHTML = "Post #" + (i+1) + " by : u/" + curpost["author"];
        nextPost.appendChild(link);
        
        var basicInfo = document.createElement("p");
        var str = "Created : " + unixTimeConverter(curpost["created"]) + "<br>";
        str += "Type : " + (curpost["link_flair_text"] || "Miscellaneous") + "<br>";
        str += "Description : <b>" + (curpost["title"] || "None") + "</b><br>";
        str += "Upvotes : " + curpost["score"] + "<br>";
        str += "Comments : " + curpost["num_comments"] + "<br>";
        basicInfo.innerHTML = str;
        nextPost.appendChild(basicInfo);

        list.appendChild(nextPost);
    }
    subRList.appendChild(list);
}

function unixTimeConverter(unixTime)
{
    var date = new Date(unixTime * 1000);
    return(date);
}
