document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.log('DOM loaded');
    }

    //Update the Devour State
    const changeDevouredBtn = document.querySelectorAll('.change-devoured');

    if (changeDevouredBtn) {
        changeDevouredBtn.forEach((button) => {
            button.addEventListener('click', (e) => {
                console.log('test');
            
                const id = e.target.getAttribute('data-id');
                const newDevoured = e.target.getAttribute('data-newdevoured');
                const newDevouredState = {
                    devoured: newDevoured,
                };

                fetch(`/api/burgers/:${id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(newDevouredState),
                }).then((response) => {
                    if (response.ok) {
                        console.log(`changed devoured to: ${newDevoured}`);
                        location.reload('/');
                    } else {
                        alert ('something went wrong');
                    }
                });
            });
        });
    }

    //Create New Burger
    const createBurgerBtn = document.getElementById('create-form');

    if (createBurgerBtn) {
        createBurgerBtn.addEventListener('submit', (e) => {
            e.preventDefault();

            const newBurger = {
                burger_name: document.getElementById('bn').value.trim(),
            };

            fetch('/api/burgers', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(newBurger),
            }).then(() => {
                document.getElementById('bn').value = '',

                console.log('Created a new Burger');
                location.reload();
            });
        });
    }
})
