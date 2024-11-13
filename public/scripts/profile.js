document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        document.querySelector('.profile-header .profile-photo').style.backgroundImage = `url('${currentUser.profilePhoto || 'ruta/a/tu/perfil.jpg'}')`;
        document.querySelector('.profile-info h2').textContent = `${currentUser.nombre} ${currentUser.primer_apellido} ${currentUser.segundo_apellido}`;
        document.querySelector('.profile-info p:nth-of-type(1)').textContent = currentUser.descripcion;
    }

    const publishButton = document.getElementById('publishButton');
    const memoryText = document.getElementById('memoryText');
    const memoryImage = document.getElementById('memoryImage');
    const memoriesContainer = document.getElementById('memoriesContainer');

    function loadMemories() {
        const memories = JSON.parse(localStorage.getItem('memories')) || [];
        memories.forEach(memory => {
            addMemoryToContainer(memory.text, memory.image);
        });
    }

    function saveMemory(text, image) {
        const memories = JSON.parse(localStorage.getItem('memories')) || [];
        memories.unshift({ text, image });
        localStorage.setItem('memories', JSON.stringify(memories));
    }

    function addMemoryToContainer(text, image) {
        const memoryCard = document.createElement('div');
        memoryCard.className = 'memory-card';

        const memoryContent = document.createElement('p');
        memoryContent.textContent = text;

        memoryCard.appendChild(memoryContent);

        if (image) {
            const memoryImageElement = document.createElement('img');
            memoryImageElement.src = image;
            memoryCard.appendChild(memoryImageElement);
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function() {
            const newText = prompt('Edita tu memoria:', memoryContent.textContent);
            if (newText !== null) {
                memoryContent.textContent = newText;
                // Actualizar memoria en localStorage
                const memories = JSON.parse(localStorage.getItem('memories'));
                const memoryIndex = memories.findIndex(m => m.text === text && m.image === image);
                if (memoryIndex !== -1) {
                    memories[memoryIndex].text = newText;
                    localStorage.setItem('memories', JSON.stringify(memories));
                }
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function() {
            memoriesContainer.removeChild(memoryCard);
            const memories = JSON.parse(localStorage.getItem('memories'));
            const filteredMemories = memories.filter(m => !(m.text === text && m.image === image));
            localStorage.setItem('memories', JSON.stringify(filteredMemories));
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        memoryCard.appendChild(buttonContainer);

        memoriesContainer.insertBefore(memoryCard, memoriesContainer.firstChild);
    }

    loadMemories();

    publishButton.addEventListener('click', function() {
        const text = memoryText.value;
        const imageFile = memoryImage.files[0];

        if (text.trim() === '' && !imageFile) {
            showError('Por favor, escribe algo o sube una foto.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageBase64 = event.target.result;
            saveMemory(text, imageBase64);
            addMemoryToContainer(text, imageBase64);
            memoryText.value = '';
            memoryImage.value = '';
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            reader.onload();
        }
    });
});

