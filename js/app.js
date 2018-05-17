document.onreadystatechange = function(){
    if(document.readyState === "complete"){
        initApplication();
    }
}
/**
 * @argument ele HTMLNode
 */

function generateGraphElements(ele, data, idElement, style, msgBodyId, callback) {
    let columns = document.createElement("div");
    columns.className = 'columns';
    generateGraphGroupTitle(ele,data['title'],msgBodyId);
    let msgContent = document.getElementById(msgBodyId);
    msgContent.appendChild(columns);

    // let levelContent = document.createElement('div'); 
    // levelContent.className = 'level';

    // let levelItem = document.createElement('div');
    // levelItem.className = 'level-item';
    // levelItem.appendChild(columns);
    // levelContent.appendChild(levelItem);

    // ele.appendChild(levelContent);

    // ele.appendChild(columns);
    Array.from(data['graphs'].entries()).map((grapData) => {

        let canvasId = grapData[0] == 0? idElement:`${idElement}${grapData[0]}`;
        let column = document.createElement("div");
        column.className = 'column';

        let message = document.createElement("div");
        message.className = `message ${style}`;
        let messageHeader = document.createElement("div");
        messageHeader.className = 'message-header';
        messageHeader.innerHTML = grapData[1]['graphTitle'];

        let messageBody = document.createElement("div");
        messageBody.className = 'message-body';
        message.appendChild(messageHeader);
        message.appendChild(messageBody);

        let chartCanvas = document.createElement('canvas');
        chartCanvas.id = canvasId; 
        chartCanvas.height = 300;
        // column.appendChild(chartCanvas);
        messageBody.appendChild(chartCanvas);
        column.appendChild(message);
        columns.appendChild(column)
        let ctx = document.getElementById(canvasId).getContext("2d");
        callback(ctx);
    });
}

function generateGraphGroupTitle(ele, title, titleId) {
    let msg = document.createElement('div');
    msg.classList.add('message');
    msg.classList.add('is-dark');

    // let lvl_lft = document.createElement('div');
    // lvl_lft.className = 'level-left';

    let msgHeader= document.createElement('div');
    msgHeader.className = 'message-header';
    msgHeader.innerHTML = title;

    let msgBody= document.createElement('div');
    msgBody.className = 'message-body';
    msgBody.id =titleId; 

    msg.appendChild(msgHeader);
    msg.appendChild(msgBody);

     
    ele.appendChild(msg);

}

function removeChilds(id){
    let ele = document.getElementById(id)
    if(ele.hasChildNodes()){
        while(ele.firstChild) {
            ele.removeChild(ele.firstChild);
        }

    }
    return ele;
}

function initApplication(){
    /*
    * Event registration and handling
     */
    moment.locale('es');
    flatpickr.localize(flatpickr.l10ns.es);
    const picker = flatpickr(".myPicker", {
        // defaultDate: [new Date(),new Date()],
        enableTime: false,
        dateFormat: "Y-m-d H:i",
        mode: 'range'
    });
    let closeModalButton = document.querySelector('button.delete');
    closeModalButton.addEventListener('click', function() {
        let modal = document.getElementById("dataGrid");
        modal.classList.toggle('is-active');
    })

    let closeModalButtonBottom = document.getElementById("close-modal");
    closeModalButtonBottom.addEventListener('click', function() {
        let modal = document.getElementById("dataGrid");
        modal.classList.toggle('is-active');
    })

    let generateButton = document.getElementById("generateButton");
    generateButton.addEventListener('click', function() {
        if(picker.selectedDates.length){
            console.log(picker.selectedDates);
            //fetch from the server 
            // let loadBar = new Loadbar();
            // loadBar.start();
            setTimeout(() => {
                let data ={'title':'Faltas','graphs':[{'graphTitle':'Conductores'},{'graphTitle':'Vehiculos'},{'graphTitle':'Grupos'}]};

                let ele = removeChilds('drivingIndexGraphs');

                generateGraphElements(ele, data, 'mychart','is-info', 'foults',setChartOptions);
                //fetch from server
                let eleDistance = removeChilds('distancesGraphs');
                // let eleDistance = document.getElementById('distancesGraphs');
                data['title'] = 'Distancias / Horas';
                generateGraphElements(eleDistance, data, 'mydistancechart','is-warning', 'distances',setBarChartOptions);
                let viewGridButton = document.createElement('a');
                viewGridButton.classList.add('button');
                viewGridButton.classList.add('is-right');
                viewGridButton.innerHTML='Ver Tabla';

                viewGridButton.addEventListener('click', function() {
                    let dataGrid = document.getElementById('dataGrid');
                    dataGrid.classList.toggle('is-active');
                })

                let viewGridButton2 = document.createElement('a');
                viewGridButton2.classList.add('button');
                viewGridButton2.classList.add('is-right');
                viewGridButton2.innerHTML='Ver Tabla';

                viewGridButton2.addEventListener('click', function() {
                    let dataGrid = document.getElementById('dataGrid');
                    dataGrid.classList.toggle('is-active');
                })




                let hdr= document.getElementById('foults');
                let hdrDistances= document.getElementById('distances');
                hdr.appendChild(viewGridButton);
                hdrDistances.appendChild(viewGridButton2);
            },500)
            return;
        } 
        new Noty({
            text:'Debes Seleccionar un rago de Fecha',
            timeout:3000,
            type:'warning',
            layout:'topCenter',
            sounds: {
                sources:['']

            }

        }).show();
    })


}

function setBarChartOptions(ctx) {
    return  new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ["Hernan Baquedano", "Pedro Valdivia", "Bernardo Ohiggins", "Alan Brito", "Juan Collison", "Ken Watanabe"],
            datasets: [{
                label: 'Distancia Recorrida',
                data: [1200, 1900, 355, 5409, 2289, 3083],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Horas de Conduccion',
                data: [60, 120, 5, 200, 80, 193],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }

    })

}
function setChartOptions(ctx){
    return new Chart(ctx, {
        type: 'scatter',
        data: {
            // datasets: [{

            //     label: 'Pedro Valdivia',
            //     data: [{
            //         x: moment(new Date(2018,3,1)),
            //         y: 10
            //     }, {
            //         x: moment(new Date(2018,3,7)),
            //         y: 14
            //     }, {
            //         x: moment(new Date(2018,3,14)),
            //         y: 18
            //     },{
            //         x: moment(new Date(2018,3,1)),
            //         y: 3

            //     }
            // ]
            datasets:[
                {
                    label :'Pedro Valdivia',
                    // backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
                    backgroundColor: '#333333',
                    data : [{
                        x:moment().month(3),
                        y:10
                    },{
                        x:moment().month(4),
                        y:4
                    }
                ]
                },
                {
                    label :'Hernan Baquedano',
                    // backgroundColor: color(window.chartColors.purple).alpha(0.2).rgbString(),
                    backgroundColor: '#0000ff',
                    data : [{
                        x:moment().month(3),
                        y:7
                    },{
                        x:moment().month(4),
                        y:8.1
                    }
                ]
                },
                {
                    label :'Bernardo  Ohiggins',
                    // backgroundColor: color(window.chartColors.yellow).alpha(0.2).rgbString(),
                    backgroundColor: '#ff0000',
                    data : [
                        {
                        x:moment().month(3),
                        y:3
                    },{
                        x:moment().month(4),
                        y:8
                    }]
                }
            ]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                distribution:'series',
                position: 'bottom',
                ticks:{
                    source: 'data'
                },
                time:{
                    unit: 'month',
                    displayFormats:{
                        month:'MMMM'
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]

        }
    } 
})

}
