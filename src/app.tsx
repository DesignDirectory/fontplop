import { ipcRenderer } from 'electron'
import * as React from 'react'
import * as Dropzone from 'react-dropzone';

export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      dragOver: false
    }
  }

  onDrop(acceptedFiles: Array<any> /* rejected: any */) {
    const acceptedFilePaths = acceptedFiles.map(f => f.path)
    ipcRenderer.send('process-fonts', acceptedFilePaths)
    this.setState({ dragOver: false })
  }

  onDragOver() {
    this.setState({ dragOver: true })
  }

  onDragLeave() {
    this.setState({ dragOver: false })
  }

  public render() {
    const dzStyle = {
      position: 'fixed',
      top: '1px',
      left: '1px',
      right: '1px',
      bottom: '1px',
      borderRadius: '3px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#087D9B',
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '24px',
      lineHeight: '1em',
      userSelect: 'none',
      cursor: 'default'
    }
    const dzActiveStyle = {
      backgroundColor: 'green',
      borderColor: 'green'
    }

    const titleStyle = {
      fontSize: 20,
      marginBottom: 10
    }

    const subtitleStyle = {
      fontSize: 10,
      clear: 'both',
      color: 'rgba(255,255,255,0.5)',
      padding: '0px 20px',
      lineHeight: '1.75em'
    }

    const snippetStyle = {
      backgroundColor: this.state.dragOver ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
      borderRadius: 2,
      padding: '2px 5px'
    }

    return (
      <Dropzone
        disableClick
        style={dzStyle}
        activeStyle={dzActiveStyle}
        onDrop={this.onDrop.bind(this)}
        onDragOver={this.onDragOver.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
        accept=".ttf, .otf"
      >
        <div style={{ padding: 30 }}>
          <div style={titleStyle}>Plop some ish here</div>
          <div style={subtitleStyle}>ish must be of type <span style={snippetStyle}>ttf</span>, <span style={snippetStyle}>woff</span>, or <span style={snippetStyle}>eot</span></div>
        </div>
      </Dropzone>
    );
  }
}
