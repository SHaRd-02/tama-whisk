// Declaring variables
console.log('app.js cargado');
let i = 0;
let speed = 40; /* The speed/duration of the effect in milliseconds */
const woofSound = new Audio('./sounds/dog-bark.mp3');
let playerName = localStorage.getItem("playerName") || "";
let money = JSON.parse(localStorage.getItem("money")) || 40;
let health = JSON.parse(localStorage.getItem("health")) || 60;
let happinnes = JSON.parse(localStorage.getItem("happinness") || 80);
let frases = [`¿Como vas en tu trabajo de esclavo?`, 
	`Queremos comer, comer, comer!`, 
	"Puto el que lo lea", 
	"Odio los lunes, pero sobre todo odio a los gatos",
	"Trabajo, trabajo, trabajo... ¿Recuerdas cómo se hace?",
	"¿Estás ahí? Porque tu perro tiene hambre... solo para que lo sepas.",
	"¡Vaya! Te ves ocupado... ¿puedes tomar un descanso y alimentarme?",
	"¿Sabes lo que significa 'procrastinar'? ¡Porque parece que sí!",
	"¿Necesitas una pausa? Porque yo necesito comida. Ya sabes, prioridades."
];
let txt = `Hola de nuevo ${playerName}, ya ponte chambear para que me des de comer.`; /* The text */
// Variable para el temporizador de inactividad
let idleTimer;


//DOM variables
const buttonsMenu = document.getElementById("buttons-menu");
const dialogName = document.getElementById("dialog-name");
const bubbleText = document.getElementById("bubble-text");
const bubble = document.getElementById("bubble");
const healthElement = document.getElementById("health");
const moneyElement = document.getElementById("money");
const doneBtn = document.getElementById("done-btn");
const healthText = document.getElementById("health-text");
const happinnesText = document.getElementById("happinnes-text");
const stoneElement = document.getElementById("stone");
const deadText = document.getElementById("dead-text");
//game screens
const dogScreen = document.getElementById("dog-screen");
const foodScreen = document.getElementById("food-screen");
const workScreen = document.getElementById("work-screen");
const deadScreen = document.getElementById("dead-screen");

//start of the program
if (playerName === ''){
	initialDialog();
}else{;
	console.log(`Hi, ${playerName} `);
	if (health <= 100 && health >= 80){
		health -= 30;
	}
	else if (health <= 79 && health >= 50){
		health -= 20;
	}
	else{
		health -= 10;
	}
	
	if (health <= 0){
		deadText.innerText = "Lo mataste de hambre!!!";
		showDead();
	}



	JSON.stringify(localStorage.setItem("health", health));

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
	buttonsMenu.classList.remove("hidden");
	dialogName.classList.add("hidden");
	bubbleText.innerHTML = '';
	i = 0;
	txt = `Hola ${playerName}, encantado de conocerte. Tengo hambre ¿Tienes comida?`;
	typeWriter();
}

function showFood(){
	document.getElementById("money-gained").innerText = '';
	dogScreen.classList.add("hidden");
	workScreen.classList.add("hidden");
	foodScreen.classList.remove("hidden");
};
 function showDogAfterFood(){
	 foodScreen.classList.add("hidden");
	 workScreen.classList.add("hidden");
	 dogScreen.classList.remove("hidden");
};


function showDog(){
	randomFrase();
	 foodScreen.classList.add("hidden");
	 workScreen.classList.add("hidden");
	 dogScreen.classList.remove("hidden");
};

function showWork(){
	dogScreen.classList.add("hidden");
	foodScreen.classList.add("hidden");
	workScreen.classList.remove("hidden");
}

function showDead(){
	console.log("murio");
	dogScreen.classList.add("hidden");
	foodScreen.classList.add("hidden");
	workScreen.classList.add("hidden");
	deadScreen.classList.remove("hidden");
}

function dontBuyFood(){
	showDogAfterFood();
	console.log("Ya estoy lleno");
	txt = "Ya estoy lleno!";
	typeWriter();
};	


function buyFood(healthAmount){
	showDogAfterFood();
	health += healthAmount;
	if (health > 100){
		health = 100;
	} 
	JSON.stringify(localStorage.setItem("health", health));
	healthElement.value= health;
	healthText.innerText = `${health}/100`;
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
		showDogAfterFood();
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
		showDogAfterFood();
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
		showDogAfterFood();
		txt = "haha pobre, no tienes dinero! ponte a chambear";
		typeWriter();
		return
	};
	substractMoney(80);
	buyFood(80);
	
	txt = "Ñam ñam que filete mas esquisito!!!";
	typeWriter();
};
function addMoney(){
	let moneyGained = 0
	moneyGained = Math.round(Math.random() * 10);
	document.getElementById("money-gained").innerText = `+ $${moneyGained}`;
	money += moneyGained;
	JSON.stringify(localStorage.setItem("money", money));
	moneyElement.innerText = `$ ${money}`;
};

function substractMoney(amount){
	money -= amount;
	JSON.stringify(localStorage.setItem("money", money));
	moneyElement.innerText = `$ ${money}`;
};

function restart(){
	deadScreen.classList.add("hidden");
	localStorage.clear();
	showDog();
	location.reload();
};

function resetIdleTimer() {
	clearTimeout(idleTimer);
	idleTimer = setTimeout(closePage, 5 * 60 * 1000); // 5 minutos en milisegundos
  };

// Función para cerrar la página
function closePage() {
	alert('Has estado inactivo durante 5 minutos. La página se cerrará.');
	location.reload();
  };

 function randomFrase(){
	bubbleText.innerHTML = '';
	txt = '';
	const range = frases.length
	const index = Math.floor(Math.random() * range);
	i = 0;
	txt = frases[index];
	typeWriter();
 };

moneyElement.innerText = `$ ${money}`;
healthElement.value= health;
healthText.innerText = `${health}/100`;
happinnesText.innerText = `${happinnes}/100`;
typeWriter();
console.log('app.js cargado');
doneBtn.addEventListener("click", setName);
stoneElement.addEventListener("click", addMoney);

window.onload = resetIdleTimer;
window.onmousemove = resetIdleTimer;
window.onmousedown = resetIdleTimer;
window.ontouchstart = resetIdleTimer;
window.onclick = resetIdleTimer;
window.onkeydown = resetIdleTimer;
window.addEventListener('scroll', resetIdleTimer, true);

// Inicializar el temporizador al cargar la página
resetIdleTimer();