import React, { Component } from 'react';
import './App.css';
import logo from './logo-dark.png';

class App extends Component {
  state = {
    skills: this.props.skillsTagging.map(tag => tag.name),
    // highlightSkills: this.props.skillsTagging.map(tag => tag.sense.map(sense => sense.contextSources))
    text: ''
  };
  handleClick = async () => {
    let formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', 'case-testing');
    formData.append('client_secret', '46CAB011');
    formData.append('scope', 'emsiauth');
    const creds = await fetch('https://auth.emsicloud.com/connect/token', {
      method: 'POST',
      body: formData
    }).then(res => res.json());
    const response = await fetch('https://case.emsicloud.com/extractSource', {
      method: 'POST',
      body: this.state.text,
      headers: {
        Authorization: `Bearer ${creds.access_token}`,
        'Content-Type': 'text/plain'
      }
    }).then(res => console.log(res));
    // console.log(response);
  };
  render() {
    const { skills, text } = this.state;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} />
            <h1 style={{ margin: '0' }}>Skills Tagger</h1>
          </header>
          <p className="App-intro">To get started, blah.</p>
        </div>
        <div
          style={{
            display: 'flex'
          }}
        >
          <div
            style={{
              width: '50%',
              padding: '30px'
            }}
          >
            <h2>Add some text</h2>
            <textarea
              style={{
                display: 'block',
                width: '100%',
                height: '500px',
                border: '1px solid grey'
              }}
              onChange={({ target: { value } }) =>
                this.setState({ text: value })
              }
            />
            <div style={{ marginTop: '10px' }}>
              <button onClick={this.handleClick} disabled={text.length === 0}>
                Show me skills
              </button>
              <button
                style={{ float: 'right' }}
                onClick={() => this.setState({ text: '' })}
              >
                Reset
              </button>
            </div>
          </div>
          <div
            style={{
              width: '50%',
              padding: '30px'
            }}
          >
            <h2>Skills</h2>
            <ul
              style={{
                border: '1px solid grey',
                margin: '0',
                padding: '10px',
                listStyleType: 'none',
                height: '483px'
              }}
            >
              {this.state.skills.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  skillsTagging: [
    {
      name: 'Solaris (Operating System)',
      id: 'KS440RJ6712TQNWM2G2X',
      type: 'Hard Skill',
      senses: [
        {
          surfaceForm: {
            value: 'SOLARIS 10'
          },
          contextSources: [
            {
              sequence: [
                {
                  sourceEnd: 179,
                  sourceStart: 175,
                  value: 'RHEL'
                }
              ]
            },
            {
              sequence: [
                {
                  sourceEnd: 24,
                  sourceStart: 19,
                  value: 'LINUX'
                }
              ]
            },
            {
              sequence: [
                {
                  sourceEnd: 152,
                  sourceStart: 147,
                  value: 'LINUX'
                }
              ]
            },
            {
              sequence: [
                {
                  sourceEnd: 302,
                  sourceStart: 299,
                  value: 'AIX'
                }
              ]
            }
          ],
          surfaceFormSources: [
            {
              sequence: [
                {
                  sourceEnd: 412,
                  sourceStart: 405,
                  value: 'SOLARIS'
                },
                {
                  sourceEnd: 415,
                  sourceStart: 413,
                  value: '10'
                }
              ]
            }
          ]
        }
      ],
      confidence: 0.97
    },
    {
      name: 'Linux',
      id: 'KS122VT6S2JJ5C5D80NF',
      type: 'Hard Skill',
      senses: [
        {
          surfaceForm: {
            value: 'LINUX'
          },
          contextSources: [
            {
              sequence: [
                {
                  sourceEnd: 302,
                  sourceStart: 299,
                  value: 'AIX'
                }
              ]
            },
            {
              sequence: [
                {
                  sourceEnd: 179,
                  sourceStart: 175,
                  value: 'RHEL'
                }
              ]
            }
          ],
          surfaceFormSources: [
            {
              sequence: [
                {
                  sourceEnd: 24,
                  sourceStart: 19,
                  value: 'LINUX'
                }
              ]
            },
            {
              sequence: [
                {
                  sourceEnd: 152,
                  sourceStart: 147,
                  value: 'LINUX'
                }
              ]
            }
          ]
        }
      ],
      confidence: 0.95
    },
    {
      name: 'Red Hat Enterprise Linux',
      id: 'KS128G66HPYR0ZXM02K2',
      type: 'Hard Skill',
      senses: [
        {
          surfaceForm: {
            value: 'RHEL'
          },
          contextSources: [
            {
              sequence: [
                {
                  sourceEnd: 24,
                  sourceStart: 19,
                  value: 'LINUX'
                }
              ]
            },
            {
              sequence: [
                {
                  sourceEnd: 152,
                  sourceStart: 147,
                  value: 'LINUX'
                }
              ]
            },
            {
              sequence: [
                {
                  sourceEnd: 302,
                  sourceStart: 299,
                  value: 'AIX'
                }
              ]
            }
          ],
          surfaceFormSources: [
            {
              sequence: [
                {
                  sourceEnd: 179,
                  sourceStart: 175,
                  value: 'RHEL'
                }
              ]
            }
          ]
        }
      ],
      confidence: 0.94
    },
    {
      name: 'IBM AIX',
      id: 'KS120CW66G0YDJVNL2Z7',
      type: 'Hard Skill',
      senses: [
        {
          surfaceForm: {
            value: 'AIX'
          },
          contextSources: [
            {
              sequence: [
                {
                  sourceEnd: 24,
                  sourceStart: 19,
                  value: 'LINUX'
                }
              ]
            },
            {
              sequence: [
                {
                  sourceEnd: 152,
                  sourceStart: 147,
                  value: 'LINUX'
                }
              ]
            }
          ],
          surfaceFormSources: [
            {
              sequence: [
                {
                  sourceEnd: 302,
                  sourceStart: 299,
                  value: 'AIX'
                }
              ]
            }
          ]
        }
      ],
      confidence: 0.89
    }
  ]
};

export default App;
