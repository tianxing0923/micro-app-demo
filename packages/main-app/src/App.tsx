import logo from 'src/assets/images/logo.svg?url'
import Logo from 'src/assets/images/logo.svg'
import './App.less'

function App() {
  function toPage(name: string) {
    history.pushState({}, '', name)
  }

  return (
    <div className="main-app">
      <header>
        <nav>
          <img src={logo} style={{ width: 100 }} />
          <Logo style={{ width: 100 }} />
          <a onClick={() => toPage('/react')}>ReactApp</a>&nbsp;&nbsp;
          <a onClick={() => toPage('/vue2')}>Vue2App</a>&nbsp;&nbsp;
          <a onClick={() => toPage('/vue3')}>Vue3App</a>
        </nav>
      </header>
      <main id="container" />
    </div>
  )
}

export default App
