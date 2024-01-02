function createCard(apartment) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardImage = document.createElement('img');
    cardImage.className = 'card-img-top';
    cardImage.src = apartment.image;
    cardImage.alt = 'Apartment Image';
    cardImage.onclick = function () {
        open(apartment.image)
    }
    card.appendChild(cardImage);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = "Квартира #" + apartment.номер;

    const cardContent = document.createElement('p');
    cardContent.className = 'card-text';
    cardContent.innerHTML =
        "Здание: " + apartment.здание + '<br>' +
        "Подъезд: " + apartment.подъезд + '<br>' +
        "Этаж: " + apartment.этаж + '<br>' +
        "Площадь: " + apartment.квадратура + '<br>' +
        "Кол-во Комнат: " + apartment.комнаты + '<br>' +
        "Цена: " + apartment.стоимость + '<br>';

    const cardStatus = document.createElement('a');
    if (apartment.статус === 'Забронировано') {
        cardStatus.className = 'btn btn-warning';
    } else if (apartment.статус === 'Продано') {
        cardStatus.className = 'btn btn-danger';
    } else {
        cardStatus.className = 'btn btn-primary';
        cardStatus.onclick = function () {
            booking2(apartment.номер);
        }
    }
    cardStatus.innerHTML = apartment.статус;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardContent);
    cardBody.appendChild(cardStatus);
    card.appendChild(cardBody);

    return card;
}

function addCardToContainer() {
    const house = document.getElementById('house') ? document.getElementById('house').value : '';
    const apartmentNumberValue = document.getElementById('flat') ? document.getElementById('flat').value : '';
    const porchValue = document.getElementById('porch') ? document.getElementById('porch').value : '';
    const floorValue = document.getElementById('floor') ? document.getElementById('floor').value : '';
    const areaValue = document.getElementById('area') ? document.getElementById('area').value : '';
    const roomAmountValue = document.getElementById('roomAmount') ? document.getElementById('roomAmount').value : '';
    const priceValue = document.getElementById('price') ? document.getElementById('price').value : '';
    const imagePathInput = document.getElementById('image');
    const imagePathValue = imagePathInput ? extractFileName(imagePathInput.value) : '';

    function extractFileName(fullPath) {
        return fullPath.replace(/^.*[\\\/]/, '');
    }

    if (!apartmentNumberValue || !porchValue || !floorValue || !areaValue || !roomAmountValue || !priceValue || !imagePathValue) {
        alert('Please fill in all required fields.');
        return;
    }

    document.getElementById('house').value = '';
    document.getElementById('flat').value = '';
    document.getElementById('porch').value = '';
    document.getElementById('floor').value = '';
    document.getElementById('area').value = '';
    document.getElementById('roomAmount').value = '';
    document.getElementById('price').value = '';
    document.getElementById('image').value = '';

    const savedCard = {
        apartmentNumber: {
            apartmentNumber: apartmentNumberValue,
            house: house,
            porch: porchValue,
            floor: floorValue,
            area: areaValue,
            roomAmount: roomAmountValue,
            price: priceValue,
            imageURL: imagePathValue
        }
    };

    fetch('/addData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedCard),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Data added successfully:', data);
        })
        .catch(error => {
            console.error('Error adding data:', error);
        });
}