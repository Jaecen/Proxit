import React from 'react';
import CardListParser from '../../services/CardListParser'

const sampleEntry =
  `1 Acidic Slime [CMD]
1 Grave Pact [CMD]
1 Command Tower [C13]
1 Cyclonic Rift [C14]
1 Sun Titan [C15]
1 Sol Ring [C16]
1 Chaos Warp [C17]
1 Thantis the War Weaver [C18]
1 Arlinn Kord [SOI]`;

class CardProxyManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = { entry: sampleEntry };
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEntryChange(event) {
    this.setState({ entry: event.target.value });
  }

  handleSubmit(event) {
    var x = CardListParser(this.state.entry);
    console.log(x);
  }

  render() {
    return (
      <section className="section">
        <div className='container'>

          <div className='field'>
            <label className='label'>Card List</label>
            <div className='control'>
              <textarea
                className='textarea card-entry-list'
                rows='10'
                value={this.state.entry}
                onChange={this.handleEntryChange} />
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <button className='button is-primary' onClick={this.handleSubmit}>Generate Proxies</button>
            </div>
          </div>

        </div>
      </section>
    );
  }
};

export default CardProxyManagement;