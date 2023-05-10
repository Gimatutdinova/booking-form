import React, { Component, useState, useEffect } from 'react';
import { DatePicker, Stack, DateRangePicker } from 'rsuite';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tower: ['A', 'B'],
            floor: [3],
            room: [1],
            output: {
                'tower': '',
                'floor': '',
                'room': '',
                'date': '',
                'time': '',
                'comment': '',
            }
        }
    }

    componentDidMount() {
        for (let i = 4; i != 28; i++) {
            this.state.floor.push(i)
        }
        for (let i = 2; i != 11; i++) {
            this.state.room.push(i)
        }
        this.setState({
            floor: this.state.floor,
            room: this.state.room,
        })
      }

    handleChange = (value, item) =>  {
        this.state.output[value] = item;
        this.setState({
            'output': this.state.output,
        });
        document.getElementById(value.concat('-icon')).classList.remove('_active')
    }

    dateChange = (value, array) => {
        let arr = array.split(' ')
        if (arr[0] != 'null') {
            if (value === 'date') {
                this.handleChange(value, arr[2] + ' ' + arr[1] + ' ' + arr[3])
            } else {
                let time_start = arr[4].split(':')
                let time_end = arr[12].split(':')
                this.handleChange(value, time_start[0] + ':' + time_start[1] + ' - ' + time_end[0] + ':' + time_end[1])
            }
        } else {
            if (value === 'date') {
                this.handleChange(value, '')
            } else {
                this.handleChange(value, '')
            }
        }  
    }
    
    active = (id) =>  {
        Array.from(document.getElementsByClassName(id)).forEach(
            (element) => {
                element.classList.toggle('_active')
            }
        );
    }

    clean = () => {
        this.setState({
            output: {
                'tower': '',
                'floor': '',
                'room': '',
                'date': '',
                'time': '',
                'comment': '',
            }
        });
        document.getElementById('textarea').value = '';
        Array.from(document.getElementsByClassName('rs-btn-close')).forEach(
            (element) => {
                element.click();
            }
        );
    }

    submit = () => {
        let i = 0;
        for (let prop in this.state.output) {
            const icon = document.getElementById(prop.concat('-icon'))
            if (this.state.output[prop] === '') {
                icon.classList.add('_active')
                i ++;
            } else {
                icon.classList.remove('_active')
            }; 
        }
        if (i > 0) {
            document.getElementById('message').classList.add('_active')
        } else {
            console.log(JSON.stringify(this.state.output))
            document.getElementById('message').classList.remove('_active')
        }
    }

    render() {
            return (
                <div className="wrapper">
                    <div className='form form__conteiner'>
                        <div className='form__menu'>
                            <Select item={this.state.tower} output={this.state.output['tower']} value='tower' onClick={this.handleChange} active={this.active}/>
                            <Select item={this.state.floor} output={this.state.output['floor']} value='floor' onClick={this.handleChange} active={this.active}/>
                            <Select item={this.state.room} output={this.state.output['room']} value='room' onClick={this.handleChange} active={this.active}/>
                        </div>
                        
                        <Date onChange={this.dateChange}/>

                        <div id='comment' className='form__comment'>
                            
                            <p className='form__comment_text'>Комментарий<span className='icons_comment' id='comment-icon'>*</span></p>
                            <textarea id='textarea' name="comment" cols="40" rows="3" onChange={() => this.handleChange('comment', event.target.value)}></textarea>
                        </div>

                        <div className='form__menu'>
                            <button className='form__button' onClick={() => this.clean()}>Очистить</button>
                            <button className='form__button' onClick={() => this.submit()}>Отправить</button>
                            <span className='message' id='message'>Пожалуйста, заполните все поля</span>
                        </div>
                    </div>
                </div>
            )       
    }   
}

function Select(props) {
    return (
        <div className="form-select">
            <span className='icons icons_select' id={props.value + '-icon'}>*</span>
            <div className="form-select_choice" onClick={() => props.active(props.value)}>
                <p className="form-select_choiceText">{props.value}: {props.output}</p> 
                <span className={'form-select_choiceBtn' + ' ' + props.value}></span>
            </div>
            <div className={"form-select_items" + ' ' + props.value} id={props.value}>
                {props.item?.map(item => (
                    <button className='form-select_option' key={item} onClick={() => (props.onClick(props.value, item), props.active(props.value))}>{item}</button>
                ))}
            </div>
        </div>
    );
}

function Date(props) {
    return (
        <Stack direction="column" alignItems="flex-start" spacing={6}>
            <span className='icons icons_date' id='date-icon'>*</span>
            <DatePicker placeholder="гггг-мм-дд" onChange={(array) => props.onChange('date', String(array))}/>
            <span className='icons icons_date' id='time-icon'>*</span>
            <DateRangePicker format="HH:mm" placeholder="чч:мм - чч:мм" ranges={[]} onChange={(array) => props.onChange('time', String(array))}/>
        </Stack>
    )
};

                            