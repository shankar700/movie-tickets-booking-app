const container = document.querySelector('.container');
const seat = document.querySelectorAll('.row .seat:not(occupied)');
const seatCount = document.querySelector('#seats');
const totalAmount = document.querySelector("#total");
const movieSelector = document.querySelector("#movie");
const clearAll = document.querySelector("#clearAll");

populateUI();

let ticketPrice = +movieSelector.value;

console.log('movie selector: ' + movieSelector.selectedIndex);
console.log('ticket price = ' +
    ticketPrice);



function updateSelectedCount() {
    const selectedSeat = document.querySelectorAll('.row .seat.selected');
    const Count = selectedSeat.length;

    const seatsIndex = [...selectedSeat].map(seatIndex => [...seat].indexOf(seatIndex));

    localStorage.setItem('selectedSeat', JSON.stringify(seatsIndex));

    seatCount.innerText = Count;
    totalAmount.innerText = Count * ticketPrice;
}

// populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeat'));

    // console.log(selectedSeats);

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seat.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('movieSelector');

    if (selectedMovieIndex !== null) {
        console.log('movie index: ' + selectedMovieIndex);
        movieSelector.selectedIndex = selectedMovieIndex;
        console.log('movie value = ' + movieSelector.value);

    }

    // const selectedticketPrice = localStorage.getItem('ticketPrice');

    // console.log(selectedticketPrice);

    // if (selectedticketPrice !== null) {
    //     ticketPrice = +selectedticketPrice;

    // }
}

movieSelector.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    localStorage.setItem('movieSelector', JSON.stringify(e.target.selectedIndex));
    localStorage.setItem('ticketPrice', JSON.stringify(e.target.value));
    updateSelectedCount();
})

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // console.log(e.target);
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

clearAll.addEventListener('click', e => {
    seat.forEach(selection => {
        selection.classList.remove('selected');
        localStorage.clear();
        seatCount.innerText = '0';
        totalAmount.innerText = '0';
    })
});

// initial count and price
updateSelectedCount();