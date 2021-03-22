var cmd = require('node-cmd');
var $ = require('jquery')
let os = require('os');
const { crash } = require('process');
var homedir = os.userInfo().homedir

//test from pc for thomas

//console.log(os.userInfo())

currentdir = homedir
refreshinputtext(currentdir)
getdir(currentdir); 

function getdir(dir)
{
cmd.get(
    'dir' + ' ' + dir,
    function(err, data, stderr)
    {
        data = data.split("\n")
        data.pop()
        // console.log(data)

        var appendString = ''
        var stringfolder = ''
        var stringfile = ''
        
        items = document.getElementById('items')

        var lengthdata = data.length - 2

        for (index = 7; index < lengthdata; index++) 
        {
            var newdata = data[index].substring(36, data[index].length)  //100
            // console.log(newdata)
            // var fullpath = homedir + '\\' + newdata
            // console.log(fullpath)

            if(data[index].includes('<DIR>'))
            {
                stringfolder = stringfolder.concat('<div class="envellop-items"><div class="single-item"><h1 class="folder folder_desc">'+newdata+'</h1></div></div>')
            }
            else
            {
                stringfile = stringfile.concat(determinefile(newdata))
            }
        }

        appendString = stringfolder.concat(stringfile)
        items.innerHTML = appendString
    });
}



//triggered when dbclick on a folder
$('body').on("dblclick", ".single-item", function()
{
    var referencer = $(this).children('h1').text()
    var next = '\\'.concat(referencer)

    currentdir = currentdir.concat(next)

    refreshinputtext(currentdir)
    console.log(currentdir)

    getdir($(":text").val())
})

//triggered when path is put on input
$(document).ready(function() 
{
    $('#button').click(function() 
    {
        var input = $(":text").val()
        // console.log(input)
        currentdir = input
        console.log(currentdir)
        
        getdir(input)
    })
})


function determinefile(file)
{
    var string = ''

    if(file.includes('.txt'))
    {
        string = '<div class="envellop-items"><div class="single-item"><h1 class="file txt folder_desc">'+file+'</h1></div></div>'
    }
    else if(file.includes('.pdf'))
    {
        string = '<div class="envellop-items"><div class="single-item"><h1 class="file pdf folder_desc">'+file+'</h1></div></div>' 
    }
    else
    {
        string = '<div class="envellop-items"><div class="single-item"><h1 class="file txt folder_desc">'+file+'</h1></div></div>'
    }
    

    return string
}

function refreshinputtext(currentdir)
{
    $(":text").val(currentdir)
}

