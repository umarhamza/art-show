(function(){

    const accordion = document.querySelector('#js-faqs');
    const storedData = JSON.parse(localStorage.getItem('items'));

    const initAll = () => {
        Accordion();
        CheckData(); 
    } // initAll
    
    const CheckData = () => {
        if (storedData) {
            CreateList(storedData);
        } else {
            LoadData();
        }
    } // CheckData

    const LoadData = () => {
        const request = new XMLHttpRequest();
        request.open('GET', 'data.json', true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                const data = JSON.parse(this.response);
                StoreData(data);
                CreateList(data);
            } else {
                console.error('server returned an error');
            }
        };

        request.onerror = function () {
            console.error('There was a connection error of some sort');
        };

        request.send();
    } // LoadData

    const StoreData = (loadedData) => {
        localStorage.setItem('items', JSON.stringify(loadedData));
    } // StoreData

    const Accordion = () => {

        accordion.addEventListener('click', function (event) {

            const _self = event.target;
            const _parent = _self.parentNode;
            const items = accordion.querySelectorAll('.accordion--item');

            if (!_self.classList.contains('accordion--title')) return;

            _parent.classList.toggle('is-open');

            for (let i = 0; i < items.length; i++) {

                if (items[i] === _parent) continue;

                items[i].classList.remove('is-open');
            }

        });
    } // Accordion

    const CreateList = (data) => {
        const list = data.rows;
        let items = '';

        list.forEach((item, i) => {
            const activeClass = i === 0 ? 'is-open' : '';
            items += `
                <li class="accordion--item ${activeClass}">
                    <h4 class="accordion--title">${item.title}</h4>
                    <div class="accordion--content">
                        <p>${item.content}</p>
                    </div>
                </li>
            `;
        }); 

        accordion.innerHTML = items;
        ScrollBar();
    } // CreateList

    const ScrollBar = () => {
        new SimpleBar(document.getElementById('js-faqs'), { autoHide: true });
    } // ScrollBar


    document.addEventListener('DOMContentLoaded', initAll)

})();