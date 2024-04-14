//*********************************Global Variables*********************************

let cookieScore = 0;
let updateSeconds;
const originalTimerText = parseInt(document.querySelector('.timerCounter').innerText);
const gameMapData = cookieGenerator();

//*********************************Functions*********************************


 function countdownTimer() {
    let getSeconds = parseInt(document.querySelector('.countdownTime').innerText);

    let timer = setInterval(function () {
        getSeconds--;
        updateSeconds = document.querySelector('.countdownTime');
        updateSeconds.innerText = getSeconds;


        //getSeconds is the data type of number
        //console.log("getSeconds as a data type of: " + typeof getSeconds)


        if (getSeconds >0 && getSeconds <= 5) {
            updateSeconds.style.cssText = "color: red; scale: 1.1";
            const checkClassList = document.querySelector('.countdownTime');
            if (checkClassList.classList[1] === undefined) {
                checkClassList.classList.add('activePopOut');
                //console.log(checkClassList.classList) : Checking Class List
            }
        }
        if (getSeconds <= 0) {
            clearInterval(timer);
            let finalTimerCounter = document.querySelector('.countdownTime');
            finalTimerCounter.classList.remove('activePopOut');
            updateSeconds.style.cssText = "color: white; font-size: 18pt";
            finalTimerCounter.innerText = 0;
            smodes.classList.remove('smodes')
            console.log('game has ended. Has smodes disappeared??')


        }

    }, 1000);

}



function resetCountdownTimer()
{
    document.querySelector('.countdownTime').innerText = originalTimerText;
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


//*********************************Cookie Increase Based on User Score*********************************

//Cookies to increase based on user score.

function scoreCheck(scoreTally) {
    let cookieCounterIncrease = 2;

    if (scoreTally % cookieCounterIncrease === 0) {
        //console.log('The score is divisible cleanly by ' + cookieCounterIncrease);
        let cookieIncrement = scoreTally / cookieCounterIncrease - 1; // Calculate the number of increments
        //console.log('cookie increment: ' + cookieIncrement);

        // Get total number of cookies on screen
        const totalNumberOfCookiesOnScreen = document.querySelectorAll('.cookie').length;
        //console.log('Total Number Of Cookies On-Screen: ' + totalNumberOfCookiesOnScreen);

        const requiredCookiesOnScreen = cookieIncrement + 1;
        const increaseCookiesBy = requiredCookiesOnScreen - totalNumberOfCookiesOnScreen;

        //console.log('You need to add ' + increaseCookiesBy + ' cookies');

        for (let i = 0; i < increaseCookiesBy; i++) {
            const nextCookieNumber = identifyNextClassCookieNumber();
            additionalCookieGenerator(nextCookieNumber);
        }
    }
}


//*********************************Overlap Check*********************************

const overlapCheck = function () {
    const smodesContainer = document.querySelector('.smodes');

    if (smodesContainer) {
        const smodesRect = smodesContainer.getBoundingClientRect(); // Get bounding rectangle

        document.querySelectorAll('.cookie').forEach(function(cookie) {
            const cookieContainer = cookie.getBoundingClientRect();

            // Check if cookieContainer is not null or undefined
            if (cookieContainer) {
                // Check for overlap between cookie and smodes container
                const overlap = !(
                    smodesRect.right < cookieContainer.left ||
                    smodesRect.left > cookieContainer.right ||
                    smodesRect.bottom < cookieContainer.top ||
                    smodesRect.top > cookieContainer.bottom
                );

                if (overlap) {
                    // Remove the overlapped cookie
                    cookie.remove();

                    // Regenerate a new cookie
                    const nextCookieNumber = identifyNextClassCookieNumber();
                    additionalCookieGenerator(nextCookieNumber);

                    // Update cookie score
                    cookieScore += 1;
                    const getScoreCounterText = document.querySelector('.cookieCounterText');
                    if (getScoreCounterText) {
                        getScoreCounterText.innerText = cookieScore;
                        scoreCheck(cookieScore);
                    }
                }
            }
        });
    }
};



//*********************************Game Map*********************************
// ----Move Smodes----

const smodes = document.querySelector('.smodes')
const smodesSize = smodes.offsetWidth;

let smodesPositionX = 0;
let smodesPositionY = 0;
const smodeSteps = 35;

const getGameMapHeight = gameMapData[0];
const getGameMapWidth = gameMapData[1];

const getNavSizeHeight = document.querySelector('.navSection').getBoundingClientRect().height;

function keyPress() {
    // ----Key Down Event Listener----
    if (smodes.classList.contains("smodes")) {
        document.addEventListener('keydown', function (event) {
            switch (event.key) {

                case 'ArrowUp':
                    if ((smodesPositionY - smodeSteps) > 0) {
                        smodesPositionY -= smodeSteps;
                    } else {
                        smodesPositionY = 0;
                    }
                    break;


                case 'ArrowDown':
                    if (smodesPositionY < ((getGameMapHeight * 0.9))) {
                        smodesPositionY += smodeSteps;
                    } else {
                        smodesPositionY = (getGameMapHeight + smodesSize)
                    }
                    break;


                case 'ArrowLeft':
                    if ((smodesPositionX - smodeSteps) > 0) {
                        smodesPositionX -= smodeSteps;
                    } else {
                        smodesPositionX = 0;
                    }
                    break;


                case 'ArrowRight':
                    if (smodesPositionX < ((getGameMapWidth * 0.9) - smodesSize)) {
                        smodesPositionX += smodeSteps;
                    } else {
                        smodesPositionX = (getGameMapWidth - smodesSize);
                    }

                    break;


                default:
                    console.log('no movement');
            }

            smodes.style.transform = `translate(${smodesPositionX}px, ${smodesPositionY}px)`;
            overlapCheck()


        });

    }
}

//*********************************Game Logic*********************************


document.addEventListener("keydown", function (event){

    switch (event.key) {

        case 's':
        // ###########  Landing Page  #############
            // Hide landing page

            keyPress()
            countdownTimer()
        break;

        case 'r':
            location.reload()
            break;


        default:
            console.log('no key pressed');
            break;



        // ###########  Game Finish Page ############

    }
})


