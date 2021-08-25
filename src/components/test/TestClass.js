import React, { Component } from 'react';
import Images from './Images';

class TestClass extends Component {
  constructor(props) {
    console.log('TestClass Constructor-1');
    super();
    this.state = {
      title: 'React Learning',
      isShowing: false,
      label: 'Toggle Image',
    };
  }
  componentDidMount() {
    console.log('TestClass Mounted-3');
    this.setState({ title: 'Title Changed By LifeCycle Method' });
  }

  componentDidUpdate() {
    console.log('TestClass Updated');
  }

  handleClick = () => this.setState({ isShowing: !this.state.isShowing });
  render() {
    console.log('TestClass Render-2');
    return (
      <section className='flex justify-center'>
        <div className='w-1/2'>
          <div className='my-4'>
            <div className='text-center'>
              <div className='bg-gray-600 text-white p-5 border'>
                {this.state.title}
              </div>
              <button
                className='p-1 bg-blue-700 text-white my-2'
                onClick={this.handleClick}
              >
                {this.state.label}
              </button>
            </div>
            {this.state.isShowing && <Images />}
          </div>
        </div>
      </section>
    );
  }
}

export default TestClass;
