import React, { Component } from 'react';
import './App.css';
import logo from './logo-dark.png';

const {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_SCOPE,
  REACT_APP_GRANT_TYPE
} = process.env;

/*
Systems Engineer - Linux at Eikon Consulting Group  Plano, TX 75024  About the Job  6 Months Contract To Hire  * 10 years or more of Linux Experience - Red Hat (RHEL) / Oracle (UEK) - 6.x or 7.x - Building, Security Hardening, Performance Tuning and Troubleshooting.  * 2-3 years of AIX 6.x and 7.x - Building, Security Hardening, 
Performance Tuning and Troubleshooting.  * 2-3 years of Solaris 10 - Building, Security Hardening, Performance Tuning and Troubleshooting
*/

class App extends Component {
  state = {
    skills: [],
    text: '',
    skillsLoaded: false
  };
  handleClick = async () => {
    let formData = new FormData();
    formData.append('grant_type', REACT_APP_GRANT_TYPE);
    formData.append('client_id', REACT_APP_CLIENT_ID);
    formData.append('client_secret', REACT_APP_CLIENT_SECRET);
    formData.append('scope', REACT_APP_SCOPE);
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
    }).then(res => res.json());
    this.setState({ skills: response.skills });
    this.setState({
      skillsLoaded: true
    });
  };
  handleHighlight = skill => {
    const { text } = this.state;
    this.text.innerHTML = text;
    skill.senses.map(sense =>
      sense.contextSources
        .sort((a, b) => {
          return b.sequence[0].sourceStart - a.sequence[0].sourceStart;
        })
        .map(source => {
          var innerHTML = this.text.innerHTML;
          innerHTML =
            innerHTML.substring(0, source.sequence[0].sourceStart) +
            "<span class='highlight'>" +
            innerHTML.substring(
              source.sequence[0].sourceStart,
              source.sequence[0].sourceEnd
            ) +
            '</span>' +
            innerHTML.substring(source.sequence[0].sourceEnd);
          this.text.innerHTML = innerHTML;
          return null;
        })
    );
  };
  handleHighlightSurface = skill => {
    const { text } = this.state;
    this.text.innerHTML = text;
    skill.senses.map(sense =>
      sense.surfaceFormSources
        .sort((a, b) => {
          return b.sequence[0].sourceStart - a.sequence[0].sourceStart;
        })
        .map(source => {
          var innerHTML = this.text.innerHTML;
          innerHTML =
            innerHTML.substring(0, source.sequence[0].sourceStart) +
            "<span class='highlight2'>" +
            innerHTML.substring(
              source.sequence[0].sourceStart,
              source.sequence[0].sourceEnd
            ) +
            '</span>' +
            innerHTML.substring(source.sequence[0].sourceEnd);
          this.text.innerHTML = innerHTML;
          return null;
        })
    );
  };
  render() {
    const { skills, text, skillsLoaded } = this.state;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} alt="" />
            <h1 style={{ margin: '0' }}>Skills Tagger</h1>
          </header>
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
            {!skillsLoaded && (
              <textarea
                placeholder="Add a job description"
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
            )}
            {skillsLoaded && (
              <p style={{ lineHeight: 2 }} ref={el => (this.text = el)}>
                {text}
              </p>
            )}
            <div style={{ marginTop: '10px' }}>
              <button onClick={this.handleClick} disabled={text.length === 0}>
                Show me skills
              </button>
              <button
                style={{ float: 'right' }}
                onClick={() => this.setState({ text: '', skillsLoaded: false })}
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
              {skills.map((skill, index) => (
                <li
                  key={`skill-${index}`}
                  onClick={() => {
                    this.handleHighlight(skill);
                  }}
                >
                  {skill.name}{' '}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      this.handleHighlightSurface(skill);
                    }}
                  >
                    Surface Form
                  </button>
                </li>
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
