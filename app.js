//*********************************Functions*********************************

function countdownTimer() {
    let getSeconds = parseInt(document.querySelector('.countdownTime').innerText);

    let timer = setInterval(function () {
        getSeconds--;
        let updateSeconds = document.querySelector('.countdownTime');
        updateSeconds.innerText = getSeconds;

        if (getSeconds <= 5) {
            updateSeconds.style.cssText = "color: red; scale: 1.1";
            const checkClassList = document.querySelector('.countdownTime');
            if (checkClassList.classList[1] === undefined) {
                checkClassList.classList.add('activePopOut');
                console.log(checkClassList.classList)
            }
        }
        if (getSeconds === 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function resetCountdownTimer()
{
    let resetSeconds = document.querySelector('.countdownTime').innerText = 20;
}


function cookieGenerator () {

    const getCookie = document.querySelector('.cookie');


    //Get Map Data
    let getGameMapElement = document.querySelector('.gameMap');
    let getGameMapSize = getGameMapElement.getBoundingClientRect();
    const getGameMapHeight = getGameMapSize.height;
    const getGameMapWidth = getGameMapSize.width;


    //Get cookie width
    const cookieSize = getCookie.offsetWidth;

    //Calculate the maximum random position within the map
    const MaxRandomHeightCookies = getGameMapHeight - cookieSize;
    const MaxRandomWidthCookies = getGameMapWidth - cookieSize;

    //Generate random cookie position on page
    let cookieRandomHeight = Math.floor(Math.random() * MaxRandomHeightCookies);
    let cookieRandomWidth = Math.floor(Math.random() * MaxRandomWidthCookies);


    //move Cookie to a random position on the map.
    getCookie.style.position = "absolute";
    getCookie.style.transform = `translate(${cookieRandomWidth}px, ${cookieRandomHeight}px)`;

    return [getGameMapHeight, getGameMapWidth]
}

function additionalCookieGenerator(number) {

    // Create Cookie Generator
    const additionalCookie = document.createElement('div');
    const parentCookieElement = document.querySelector('.gameMap');
    const uniqueId = `cookie${number}`; // Unique identifier for the cookie
    additionalCookie.className = `cookie ${uniqueId}`;
    parentCookieElement.appendChild(additionalCookie);

    // Get Map Data
    let getGameMapElement = document.querySelector('.gameMap');
    let getGameMapSize = getGameMapElement.getBoundingClientRect();
    const getGameMapHeight = getGameMapSize.height;
    const getGameMapWidth = getGameMapSize.width;

    // Get cookie width
    const getCookie = document.querySelector(`.${uniqueId}`);
    const cookieSize = getCookie.offsetWidth;

    // Calculate the maximum random position within the map
    const MaxARandomHeightCookies = getGameMapHeight - cookieSize;
    const MaxARandomWidthCookies = getGameMapWidth - cookieSize;

    // Generate random cookie position on page
    let cookieRandomHeight = Math.floor(Math.random() * MaxARandomHeightCookies);
    let cookieRandomWidth = Math.floor(Math.random() * MaxARandomWidthCookies);

    // Move Cookie to a random position on the map.
    getCookie.style.position = "absolute";
    getCookie.style.transform = `translate(${cookieRandomWidth}px, ${cookieRandomHeight}px)`;

    return [getGameMapHeight, getGameMapWidth];
}


function identifyNextClassCookieNumber() {
    const listOfCookies = Array.from(document.querySelectorAll('.cookie'));
    const listOfCookieNames = [];

    // Iterate over each element in the listOfCookies array
    listOfCookies.forEach(cookie => {
        // Access the classList property of each element
        const classes = Array.from(cookie.classList);
        const cookieClassNumber = parseInt(classes[1].replace(/cookie/g, ""));
        listOfCookieNames.push(cookieClassNumber);
    });

    listOfCookieNames.sort((a, b) => a - b);

    // Find the next available cookie number
    let nextNumber = 1;
    for (let i = 0; i < listOfCookieNames.length; i++) {
        if (listOfCookieNames[i] !== nextNumber) {
            // Found a gap in the sequence, so nextNumber is available
            break;
        }
        nextNumber++;
    }

    return nextNumber;
}


let cookieIncrement = 0

function scoreCheck(scoreTally) {
    let cookieCounterIncrease = 2;

    if (scoreTally % cookieCounterIncrease === 0) {
        console.log('The score is divisible cleanly by ' + cookieCounterIncrease);
        let cookieIncrement = scoreTally / cookieCounterIncrease - 1; // Calculate the number of increments
        console.log('cookie increment: ' + cookieIncrement);

        // Get total number of cookies on screen
        const totalNumberOfCookiesOnScreen = document.querySelectorAll('.cookie').length;
        console.log('Total Number Of Cookies On-Screen: ' + totalNumberOfCookiesOnScreen);

        const requiredCookiesOnScreen = cookieIncrement + 1;
        const increaseCookiesBy = requiredCookiesOnScreen - totalNumberOfCookiesOnScreen;

        console.log('You need to add ' + increaseCookiesBy + ' cookies');

        for (let i = 0; i < increaseCookiesBy; i++) {
            const nextCookieNumber = identifyNextClassCookieNumber();
            additionalCookieGenerator(nextCookieNumber);
        }
    }
}





// The number passed in is used to create the classname for each new cookie element.



function checkOverLap() {
    const smodesContainer = document.querySelector('.smodes').getBoundingClientRect();
    let overlapResults = []; // Array to store overlap results

    document.querySelectorAll('.cookie').forEach(function(element) {
        let cookieSelected = element.classList[1];
        const cookieContainer = document.querySelector('.' + cookieSelected).getBoundingClientRect(); // Simplified concatenation

        // Calculate the border radius of 50%
        const cookieRadius = parseInt(getComputedStyle(document.querySelector('.' + cookieSelected)).borderRadius);

        // Check if any corner of smodesContainer is inside cookieContainer
        const smodesCornersInsideCookieContainer = [
            { x: smodesContainer.left, y: smodesContainer.top },
            { x: smodesContainer.right, y: smodesContainer.top },
            { x: smodesContainer.left, y: smodesContainer.bottom },
            { x: smodesContainer.right, y: smodesContainer.bottom }
        ].some(corner => {
            // Adjusting for border-radius of cookieContainer
            const distanceX = Math.max(Math.abs(corner.x - cookieContainer.left - cookieRadius), Math.abs(corner.x - cookieContainer.right + cookieRadius));
            const distanceY = Math.max(Math.abs(corner.y - cookieContainer.top - cookieRadius), Math.abs(corner.y - cookieContainer.bottom + cookieRadius));
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            return distance <= cookieRadius;
        });

        // Check if any corner of cookieContainer is inside smodesContainer
        const cookieCornersInsideSmodesContainer = [
            { x: cookieContainer.left, y: cookieContainer.top },
            { x: cookieContainer.right, y: cookieContainer.top },
            { x: cookieContainer.left, y: cookieContainer.bottom },
            { x: cookieContainer.right, y: cookieContainer.bottom }
        ].some(corner => {
            return (
                corner.x >= smodesContainer.left &&
                corner.x <= smodesContainer.right &&
                corner.y >= smodesContainer.top &&
                corner.y <= smodesContainer.bottom
            );
        });
        let cookieName = `cookie${element[1]}`

        // Push the result to the overlapResults array
        overlapResults.push(smodesCornersInsideCookieContainer || cookieCornersInsideSmodesContainer);
    });

    // Return the overlapResults array
    return overlapResults;

}


let cookieScore = 0;


const overlapCheck = function () {
    const overLapResults = checkOverLap();
    const getScoreCounterText = document.querySelector('.cookieCounterText');

    for (let i = 0; i < overLapResults.length || i < 2; i++) {
        if (overLapResults[i] === true) {
            console.log(`Cookie ${i + 1} is overlapping`);

            // Remove the cookie directly using its unique identifier
            const cookieNameForDeletion = `cookie${i + 1}`;
            const cookieForDeletion = document.querySelector(`.${cookieNameForDeletion}`);
            if (cookieForDeletion) {
                cookieForDeletion.parentNode.removeChild(cookieForDeletion);
            } else {
                console.log('No elements found for deletion with class:', cookieNameForDeletion);
            }

            // Work out how to delete the above cookie and regenerate a new cookie
            const nextCookieNumber = identifyNextClassCookieNumber();
            // Generate a new cookie immediately after deleting the existing one
            additionalCookieGenerator(nextCookieNumber);

            console.log(nextCookieNumber);

            cookieScore += 1;
            getScoreCounterText.innerText = cookieScore;
            scoreCheck(cookieScore);
        }
    }
};






const gameMapData = cookieGenerator();


//*********************************Game Logic*********************************

// ----Move Smodes----

const smodes = document.querySelector('.smodes')
const smodesSize = smodes.offsetWidth;

let smodesPositionX = 0;
let smodesPositionY = 0;
const smodeSteps = 35;

const getGameMapHeight = gameMapData[0];
const getGameMapWidth = gameMapData[1];

const getNavSizeHeight = document.querySelector('.navSection').getBoundingClientRect().height;


// ----Key Down Event Listener----

document.addEventListener('keydown', function (event) {

    // console.log(`Max container width: ${gameMapData[1]}`)
    // console.log(`position X: ${smodesPositionX}, position Y: ${smodesPositionY}`)
    switch (event.key) {

        //It feels like the checkOverLap is taking the previous position

        case 'ArrowUp':
            if((smodesPositionY - smodeSteps) > 0) {
                smodesPositionY -= smodeSteps;
            }
            else {
                smodesPositionY = 0;
            }
            break;


        case 'ArrowDown':
            if(smodesPositionY < ((getGameMapHeight * 0.9))) {
                smodesPositionY += smodeSteps;
            }
            else {
                smodesPositionY = (getGameMapHeight + smodesSize)
            }
            break;


        case 'ArrowLeft':
            if((smodesPositionX  - smodeSteps) > 0) {
                smodesPositionX -= smodeSteps;
            }
            else {
                smodesPositionX = 0;
            }
            break;


        case 'ArrowRight':
            if(smodesPositionX < ((getGameMapWidth * 0.9) - smodesSize)) {
                smodesPositionX += smodeSteps;
            }
            else {
                smodesPositionX = (getGameMapWidth - smodesSize);
            }

            break;


        default:
            console.log('no movement');
    }

    smodes.style.transform = `translate(${smodesPositionX}px, ${smodesPositionY}px)`;
    overlapCheck()




    // Need to create functions that:
    //  Counter+1, resets timer, deletes the current cookie, and generates a new cookie
});




// countdownTimer();
// resetSeconds();



