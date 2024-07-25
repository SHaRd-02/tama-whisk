// Declaring variables
console.log('app.js cargado');
let i = 0;
let speed = 40; /* The speed/duration of the effect in milliseconds */
const woofSound = new Audio('./sounds/dog-bark.mp3');
let playerName = localStorage.getItem("playerName") || "";
let money = JSON.parse(localStorage.getItem("money")) || 40;
let health = JSON.parse(localStorage.getItem("health")) || 60;
let txt = `Hola de nuevo ${playerName}, ya ponte chambear para que me des de comer.`; /* The text */

//DOM variables
const buttonsMenu = document.getElementById("buttons-menu");
const dialogName = document.getElementById("dialog-name");
const bubbleText = document.getElementById("bubble-text");
const bubble = document.getElementById("bubble");
const healthElement = document.getElementById("health");
const moneyElement = document.getElementById("money");
const doneBtn = document.getElementById("done-btn");
//game screens
const dogScreen = document.getElementById("dog-screen");
const foodScreen = document.getElementById("food-screen");

//start of the program
if (playerName === ''){
	initialDialog();
}else{;
	console.log(`Hi, ${playerName} `);
}


function initialDialog(){
	
	buttonsMenu.classList.toggle("hidden");
	dialogName.classList.toggle("hidden");
	txt = 'Hola mundo, soy Whisky tu mascota virtual. ¿Cual es tu nombre?';
	typeWriter();
}


function typeWriter() {
	  if (i < txt.length) {
		bubbleText.innerHTML += txt.charAt(i);
		i++;
		setTimeout(typeWriter, speed);
	  }
}

function hideText(){
	bubble.classList.toggle("hidden");
	bubbleText.innerHTML = ""
	i = 0;
	setTimeout(typeWriter, 1500);
	//woofSound.play();
}

function setName(){
	playerName = document.getElementById("name").value;
	JSON.stringify(localStorage.setItem("playerName", playerName));
	buttonsMenu.classList.toggle("hidden");
	dialogName.classList.toggle("hidden");
	bubbleText.innerHTML = '';
	i = 0;
	txt = `Hola ${playerName}, encantado de conocerte. Tengo hambre ¿Tienes comida?`;
	typeWriter();
}

function showFood(){
	dogScreen.classList.add("hidden");
	foodScreen.classList.remove("hidden");
};
 function showDog(){
	 foodScreen.classList.add("hidden");
	 dogScreen.classList.remove("hidden");
 };

function dontBuyFood(){
	showDog();
	console.log("Ya estoy lleno");
	txt = "Ya estoy lleno!";
	typeWriter();
};	


function buyFood(healthAmount){
	showDog();
	health += healthAmount;
	if (health > 100){
		health = 100;
	} 
	JSON.stringify(localStorage.setItem("health", health));
	healthElement.value= health;
	console.log(health);
};

function buyFood1() {
	i = 0;
	bubbleText.innerHTML = '';
	if (health >= 100){
		dontBuyFood();
		return
	};
	if (money - 20 < 0 || money <= 0) {
		i = 0;
		showDog();
		txt = "haha pobre, no tienes dinero! ponte a chambear";
		typeWriter();
		return
	};
	substractMoney(20);
	buyFood(20);
	txt = "Ñam ñam que ricas croquetas!";
	typeWriter();
};

function buyFood2() {
	i = 0;
	bubbleText.innerHTML = '';
	if (health >= 100){
		dontBuyFood();
		return
	};
	if (money - 40 < 0 || money <= 0) {
		i = 0;
		showDog();
		txt = "haha pobre, no tienes dinero! ponte a chambear";
		typeWriter();
		return
	};
	substractMoney(40);
	buyFood(40);
	txt = "Ñam ñam que sabroso taco!!";
	typeWriter();
};

function buyFood3() {
	i = 0;
	bubbleText.innerHTML = '';
	if (health >= 100){
		dontBuyFood();
		return
	};
	if (money - 80 < 0 || money <= 0) {
		i = 0;
		showDog();
		txt = "haha pobre, no tienes dinero! ponte a chambear";
		typeWriter();
		return
	};
	substractMoney(80);
	buyFood(80);
	
	txt = "Ñam ñam que filete mas exquisito!!!";
	typeWriter();
};
function addMoney(){
	return
};

function substractMoney(amount){
	money -= amount;
	JSON.stringify(localStorage.setItem("money", money));
	moneyElement.innerText = `$ ${money}`;
};


// En tu archivo principal (por ejemplo, app.js o index.js)

function checkNotificationPermission() {
    // Recuperar la decisión del usuario desde localStorage
    const notificationPermission = localStorage.getItem('notificationPermission');

    if (notificationPermission) {
        // Si la decisión ya está guardada, no pedir permiso
        console.log(`Permiso de notificación ya decidido: ${notificationPermission}`);
        return;
    }

    // Si no se ha decidido, solicitar permiso
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(function (permission) {
            // Guardar la decisión en localStorage
            localStorage.setItem('notificationPermission', permission);
            console.log(`Permiso de notificación concedido: ${permission}`);
        });
    } else {
        // Permiso ya concedido o denegado, guardar esa decisión
        localStorage.setItem('notificationPermission', Notification.permission);
    }
}

// Llamar a la función al cargar la aplicación
checkNotificationPermission();
moneyElement.innerText = `$ ${money}`;
healthElement.value= health;
typeWriter();
console.log('app.js cargado');
doneBtn.addEventListener("click", setName);