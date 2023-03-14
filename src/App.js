import React from 'react';
import './App.css';
import { marked } from 'marked';

const defaultMarkdown = "# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n\nHere is a link to [Google](https://google.com)\n\nInline Code : `<h1></h1>`\n\n```\n// Code Block:\n\n<html>\n    <head></head>\n    <body></body>\n</html>\n```\n#### An Ordered List\n1. Item 1  \n2. Item 2\n3. Item 3\n4. Item 4\n\n#### An Unordered List\n- Item 1\n    - Sub item 1\n    - Sub item 2\n        - Sub sub item 1\n- Item 2\n\n#### Here is a blockquote\n> Blockquote\n\n**Bold** text  \n_Italic_ text  \n**_Bold and Italic_** text  \n    \n#### Example of a table\n| Column 1 | Column 2 |\n| ---------- | ---------- |\n| Cell 1 | Cell 2 |\n| Cell 3 | Cell 4 |\n  \n##### Here is an image\n  \n![\"Small town of Pelling in the state of Sikkim is other-worldly\"](http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSTd8kFzakNgm7OT3Rlur99Y727a4PsonPHTlYjUbpJsJS3wcCrSQWjqEfl_1jwh3en \"Greater Himalayan range from the town of Pelling\")";

class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      md: defaultMarkdown
    }
    //Bind methods
    this.handleChange = this.handleChange.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.clearEditor = this.clearEditor.bind(this);
  }  
  
  handleChange(event) {
    const md = event.target.value;
    //Convert event.target.value to valid html and store it in the local state.
    this.setState({
      md: md
    });
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.state.md);
  }

  clearEditor() {
    //1. Clear content inside the editor. 2. Clear state.
    this.refs.markdownField.value = '';
    this.setState({
      md: ''
    });
  }

  componentDidMount() {
    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.setState({
          md: this.state.md + "\n"
        })
      }
    })
  }

  componentWillMount() {
    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.setState({
          md: this.state.md + "\n"
        })
      }
    })
  }

  render() {
    marked.setOptions({
      breaks: true
    });
    const html = marked.parse(this.state.md);
    return (
      <div id="wrapper">
        <div style={{textAlign:"center", marginTop: 20}}>
          <p>Check out the <a id="link" href="https://www.markdownguide.org/">markdown documentation</a> for syntax details</p>
        </div>
        <div id="editor-container">
          <div id="top-bar">
            <div className="title">Editor (Type your markdown here...)</div>
            <span>
              <button className="btn" onClick={this.copyToClipboard}>Copy</button>
              <button className="btn" onClick={this.clearEditor}>Clear</button>
            </span>
          </div>
          <textarea ref="markdownField" id="editor" defaultValue={this.state.md} onChange={this.handleChange}></textarea>
        </div>
        <div id="preview-container">
          <div className="title">Preview (Your Markdown formatted into text...)</div>
          <div id="preview" dangerouslySetInnerHTML={{__html : html}}></div>
        </div>        
      </div>
    );
  }
}

export default Previewer;
