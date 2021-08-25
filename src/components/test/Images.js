import React, { Component } from 'react';

class Images extends Component {
  componentDidMount() {
    console.log('Images Mounted');
    this.timer = setInterval(() => console.log('Timer Running'), 1000);
  }
  componentWillUnmount() {
    console.log('Images Unmounted');
    clearInterval(this.timer);
  }
  render() {
    return (
      <div>
        <img
          src='https://images.unsplash.com/photo-1629199022827-eede3c3df471?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80'
          alt='Unsplash'
        />
      </div>
    );
  }
}

export default Images;
