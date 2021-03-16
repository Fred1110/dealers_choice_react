import axios from 'axios';

const consoleList = document.querySelector('#console-list');
const gameList = document.querySelector('#game-list');
const exclusivesList = document.querySelector('#exclusives-list');

let consoles, exclusives;
const renderConsoles = (consoles) => {
  const consoleId = window.location.hash.slice(1);
  const html = consoles.map( console => `
    <li class='${console.id === consoleId ? 'selected' : '' }'>
      <a href='#${console.id}'>
      ${console.name}
      </a>
    </li>
  `).join('');
  consoleList.innerHTML = html;
}

gameList.addEventListener('click', async(ev) => {
  const target = ev.target;
  const consoleId = window.location.hash.slice(1);
  if(target.tagName === 'BUTTON'){
    const _exclusives = {
      gameId: target.getAttribute('data-id'),
      isExclusive: !!target.getAttribute('data-excluisve')
    }
    const response = await axios.post(`/api/consoles/${consoleId}/exclusives`, _exclusives);
    const exclusive = response.data
    exclusives.push(exclusive);
    renderExclusives(exclusives)
  }

});

const renderGames = (games) => {
  const html = games.map ( game => `
    <li>
      ${game.name}
      <br />
      <button data-id='${ game.id}' data-exclusive='true'>Add Exclusive Game</button>
      <button data-id='${ game.id}'>Add Game</button>
    </li>
  `).join('');
  gameList.innerHTML = html;
}

const renderExclusives = (exclusives) => {
  const html = exclusives.map( exclusive => `
    <li>
    ${exclusive.game.name}
    ${ exclusive.isExcluisve ? 'is excluisve' : ''}
    </li>
  `).join('');
  exclusivesList.innerHTML = html;
}

const init = async() => {
  try {
    const games = (await axios.get('/api/games')).data;
    consoles = (await axios.get('/api/consoles')).data;
    renderConsoles(consoles);
    renderGames(games);
    const consoleId = window.location.hash.slice(1);
    if(consoleId){
      const url = `/api/consoles/${consoleId}/exclusives`;
      exclusives = (await axios(url)).data;
      renderExclusives(exclusives);
    };
  } catch (error) {
    console.log(error)
  }
};

window.addEventListener('hashchange', async() => {
  const consoleId = window.location.hash.slice(1);
  const url = `/api/consoles/${consoleId}/exclusives`;
  exclusives = (await axios(url)).data;
  renderExclusives(exclusives);
  renderConsoles(consoles)
})

init();





















// import React from 'react';
// import ReactDOM from 'react-dom';
// const faker = require('faker')

// const app = document.querySelector('#app');
// const randomName = faker.name.findName();

// const Games = ({ games, removeGame}) => {
//   return (
//     <li>
//       {games}
//       <button onClick = { removeGame(idx) }>x</button>
//     </li>
//   )
// }

// class App extends React.Component{
//   constructor(){
//     super();
//     this.state = {
//       games,
//       console
//     }
//     this.addGames = this.addGames.bind(this)
//     this.removeGame = this.removeGame.bind(this)
//   }
//   addGames(){
//     this.setState({games:[
//       ...this.state.games,
//       randomName
//     ]
//     })
//   }
//   removeGame(idx){
//     const games = this.state.games.filter((_, _idx) => _idx !== idx);
//     this.setState({ games });
//   }

//   render(){
//     const { console, games } = this.state;
//     const { addGames, removeGame } = this;

//     return (
//       <div>
//         <h2>${console} has ${games.length} games</h2>
//         <input type="button" name='Add Games' onClick = {addGames}/>
//         <ul>
//           {
//             games.map((game, idx) => <Game idx = { idx } removeGame = {removeGame} key = { idx } game = {game} />)
//           }
//         </ul>
//       </div>
//     )
//   }

// }

// const games = [];
// ReactDOM.render(React.createElement(App), app)
