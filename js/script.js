const inputSeries = document.querySelector('.series-input')
const inputRest = document.querySelector('.rest-input')
const inputTime = document.querySelector('.execution-input')
const seriesCounter = document.querySelector('.series_counter')
const timerDisplay = document.querySelector('#timer')
let intervalId;
let restIntervalId;



// Função que converte o tempo no formato "hh:mm:ss" para segundos
function parseTime(timeString) {
  if (!timeString || typeof timeString !== "string" || timeString.split(':').length !== 3) {
    return 0; // Retorna 0 caso o valor seja inválido
  }
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return (hours * 3600) + (minutes * 60) + seconds;
}

// função que recebe a duração do timer em segundos e um elemento que será usado para exibir o timer
function startTimer(duration, display) {
  let timeLeft = duration; // Armazena o tempo restante do timer
  // a função setInterval é chamada a cada 1000ms (1 segundo)
  intervalId = setInterval(function() {
    // calcula as horas, minutos e segundos restantes do timer
    var hours = parseInt(timeLeft / 3600, 10);
    var minutes = parseInt(timeLeft / 60 % 60, 10);
    var seconds = parseInt(timeLeft % 60, 10);
    // formata as horas, minutos e segundos com zero à esquerda se necessário
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    // exibe o timer no elemento passado como parâmetro
    display.textContent = hours + ":" + minutes + ":" + seconds;
    // decrementa a duração do timer em 1 segundo a cada chamada da função
    seriesCounter.textContent = `Resta ${inputSeries.value} séries`;
    if (--timeLeft < 0) {
       clearInterval(intervalId);
        if (inputSeries.value >= 1) {
        inputSeries.value--
        timeLeft = duration; // Reinicia o tempo restante para a duração original do timer
        clearInterval(restIntervalId)
        rest(parseTime(inputRest.value), timerDisplay);
      }
      else{
        display.textContent = "Concluído!";
         return; // Para a execução da função
      }
    }   
  }, 1000);
}

function rest (duration,display){
  timeLeft = duration; // Reinicia o tempo restante para a duração original do timer
  restIntervalId = setInterval(function() {
    seriesCounter.textContent = `DESCANSO!`;
    var hours = parseInt(timeLeft / 3600, 10);
    var minutes = parseInt(timeLeft / 60 % 60, 10);
    var seconds = parseInt(timeLeft % 60, 10);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = hours + ":" + minutes + ":" + seconds;
    if (--timeLeft < 0) {
      clearInterval(restIntervalId); // Interrompe o intervalo de descanso
      startTimer(parseTime(inputTime.value), timerDisplay); // Inicia o intervalo de execução novamente
    } 
  }, 1000);
}


// função chamada ao clicar no botão "go"
function go() {
   // Obtém os valores dos inputs
  const series = inputSeries.value;
  const execTime = parseTime(inputTime.value);
  const restTime = parseTime(inputRest.value);
  // Verifica se os valores são válidos
  if (series < 1 || execTime < 1 || restTime < 1) {
    alert("Preencha os campos corretamente!");
    return;
  }
  // Exibe o contador de série e inicia o timer de execução
  seriesCounter.classList.remove('hide');
  seriesCounter.textContent = `Resta ${inputSeries.value} séries`;
  startTimer(execTime, timerDisplay);
}

