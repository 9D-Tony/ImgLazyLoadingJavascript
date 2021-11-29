var dataSrcStrings = new Array();
var imgElementsArray = new Array();
var elementBoundingBoxes = new Array();

window.onload = function () {
    //lazy load images in works section
    //get img elements by id
    getImagesinElements(["image"]);
    getElementBoundingBoxes(["#image"]);

};


function checkArrayisString(stringArray) {
    return stringArray.every(i => (typeof i === "string"));
}

function getElementBoundingBoxes(elementStringArray)
{
    if(checkArrayisString(elementStringArray))
    {
        for(let i = 0;i < elementStringArray.length; i++)
        {
            elementBoundingBoxes.push(document.querySelector(elementStringArray[i]))
        }
    }
}

function updateBoundaries(elementBoundingBoxes)
{
    for(let i = 0;i < elementBoundingBoxes.length; i++)
    {
        elementBoundingBoxes[i].getBoundingClientRect();
    }

}

function getImagesinElements(arrayOfStrings)
{
    if(checkArrayisString(arrayOfStrings))
    {
        for(let s = 0;s < arrayOfStrings.length; s++)
        {
            var dataSourceElements = document.getElementById(arrayOfStrings[s]).querySelectorAll('[data-src]');
            var imgElements = document.getElementById(arrayOfStrings[s]).getElementsByTagName('img');
            dataSrcStrings.push([]);
            imgElementsArray.push([]);
            for(let e = 0;e < dataSourceElements.length; e++)
            {

                dataSrcStrings[s].push(dataSourceElements[e].dataset.src);
                imgElementsArray[s].push(imgElements[e]);
            }
        }

        console.log(imgElementsArray);
        console.log(dataSrcStrings);

    }
}

document.addEventListener('scroll', function(e) {

    lastKnownScrollPosition = window.scrollY; 
    //lastKnownScrollPosition = window.scrollY - 1100;  Add offset to see the effect more clearly

    if(elementBoundingBoxes)
    {
        updateBoundaries(elementBoundingBoxes); // update the element boundaries

        for(let b = 0; b < elementBoundingBoxes.length; b++)
        {
            bounding = elementBoundingBoxes[b].getBoundingClientRect();
            if(bounding.bottom < (window.innerHeight + lastKnownScrollPosition || document.documentElement.clientHeight + lastKnownScrollPosition))
            {

                for(let i = 0;i < imgElementsArray.length; i++)
                {
                    for(let c = 0;c < imgElementsArray[b].length; c++)
                    {
                        var elementsLength = imgElementsArray[b].length - 1;
                        var childObject = imgElementsArray[b][c];
                        var dataSrcImage = dataSrcStrings[b][c];

                        //if the last item in innerImages is not null and has a string
                        // assume that the rest of the images have also been loaded so skip all
                        //used as an optimization.  
                        if(imgElementsArray[b][elementsLength].src && imgElementsArray[b][elementsLength].src !== "")
                        {
                            break;
                        }

                        if(!childObject.src || childObject.src === "")
                        {
                            childObject.src = dataSrcImage;
                        }
                    }
                }

            }else
            {

            }

        }
    }

});

