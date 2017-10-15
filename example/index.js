import { h, render, Component } from 'preact'
import level from 'level'
import { List } from '..'

const db = window.db = level('/tmp/preact-level-value')

class Example extends Component {
  addItem () {
    db.put(`prefix${Math.random()}`, Math.random())
  }
  render () {
    return (
      <div id="example">
        Push this button:<br />
        <button onclick={ this.addItem }>Add item</button><br /><br />
        Or execute this snippet in the console:<br />
        <pre>db.put(`prefix${'{Math.random()}'}`, Math.random())</pre><br />
        Live list:
        <ul>
          <List
            db={db}
            prefix='prefix'
            renderRow={ ({ value }) => <li>{value}</li> }
          />
        </ul>
      </div>
    )
  }
}

render(<Example />, document.body)
