import { h, render, Component } from 'preact'

export class List extends Component {
  constructor ({ db, prefix, renderRow }) {
    super()
    this.state = { items: {} }
    this.onput = this.onput.bind(this)
    this.ondel = this.ondel.bind(this)
    this.db = db
    this.prefix = prefix
    this.renderRow = renderRow
  }

  add (key, value) {
    this.setState({
      items: Object.assign(this.state.items, { [key]: value })
    })
  }

  remove (key) {
    this.setState({
      items: Object.assign(this.state.items, { [key]: null })
    })
  }

  onput (key, value) {
    if (key.startsWith(this.prefix)) this.add(key, value)
  }

  ondel (key) {
    if (key.startsWith(this.prefix)) this.remove(key)
  }

  componentDidMount () {
    this.db.createReadStream({
      gt: this.prefix,
      lt: `${this.prefix}~`
    }).on('data', ({ key, value }) => {
      this.add(key, value)
    })
    this.db.on('put', this.onput)
    this.db.on('del', this.ondel)
  }

  componentWillUnmount () {
    this.db.removeListener('put', this.onput)
    this.db.removeListener('del', this.ondel)
  }

  render () {
    return (
      <div>
        {Object.keys(this.state.items).map(key => {
          const value = this.state.items[key]
          return this.renderRow({ key, value })
        })}
      </div>
    )
  }
}
