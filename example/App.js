/* @flow */
/* global require */
/* eslint-disable import/no-commonjs */

import React from 'react';
import ReactDOM from 'react-dom';
import Editor from '../src/index';
import dedent from 'dedent';
// import { highlight, languages } from 'prismjs/components/prism-core';
import Prism from 'prismjs'
import 'prismjs/components/prism-turtle';
import 'prismjs/components/prism-sparql';
// import 'prismjs/components/prism-markup';
import './styles.css';

// import doesn't seem to work properly with parcel for jsx
// require('prismjs/components/prism-sparql');

type State = {
  code: string,
};

class App extends React.Component<{}, State> {
  state = {
    code: dedent`SELECT ?c ?p ?rcode ?country ?disease
        FROM <urn:context>
        WHERE {
            ?p a gS:Person, ?c ;
            regH:birthday ?b ;
            gS:visit ?country ;
              regH:regioncode ?rcode .
              ?c rdfs:subClassOf gS:RiskGroup .
            ?country gS:hasOutbreak ?outbreak .
            ?outbreak mdS:hasConfirmedDisease ?disease .
        }`
  };

  loadMenuItems = (param) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(['Меню 1!', 'Меню 2!']), 1000);
    });
  };

  render() {
    // console.log(Prism.highlight(this.state.code, Prism.languages.sparql, 'sparql'))
    return (
        <main className="container">
          {<div className="container__content">
            <h1>react-simple-code-editor</h1>
            <p>A simple no-frills code editor with syntax highlighting.</p>
            <a
                className="button"
                href="https://github.com/satya164/react-simple-code-editor"
            >
              GitHub
            </a>
            <div className="container_editor_area">
              <Editor
                  placeholder="Type some code…"
                  value={this.state.code}
                  onValueChange={code => this.setState({ code })}
                  highlight={code => Prism.highlight(code, Prism.languages.sparql, 'sparql')}
                  padding={10}
                  className="container__editor"
                  loadMenuItems={this.loadMenuItems}
              />
            </div>
          </div>}
        </main>
    );
  }
}

/* $FlowFixMe */
ReactDOM.render(<App />, document.getElementById('root'));