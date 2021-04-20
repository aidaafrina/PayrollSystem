import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ImageBackground,StyleSheet, Text, View, Alert, Button, TextInput, TouchableOpacity } from 'react-native';

const image = { uri: 'https://i.ibb.co/C7yCr5k/Untitled-1.png' };

export default class App extends Component {
  constructor() {
    super();
    this.state = {

    
      worked: 0,
      total:0,
      payroll:0,
      x:0
  
    }
    this.hoursWorked=this.hoursWorked.bind(this);
    this.timeIn=this.timeIn.bind(this);
    this.timeOut=this.timeOut.bind(this);
    this.getDifferenceTime=this.getDifferenceTime.bind(this);
    this.Calcpayroll=this.Calcpayroll.bind(this);
    this.appendArray=this.appendArray.bind(this);
    global.HourDay = new Array(21).fill(0);
  }

  timeIn() {
    global.curTime = new Date().getHours();
    console.log("Punch in !");
    
    console.log(curTime);
  }

  getDifferenceTime(curTime,stopTime) {
    const diffInMs = Math.abs(stopTime - curTime);
    return diffInMs;
  }

  appendArray(hoursWorked){
    global.CurDate = new Date().getDate(); //get today's date
    
    //push into global array
    // HourDay.push(hoursWorked)
    HourDay[CurDate]=hoursWorked

    console.log(HourDay);
  }

  timeOut() {
    global.stopTime = new Date().getHours();
    global.hoursWorked = this.getDifferenceTime(curTime,stopTime)
    // append in array

    this.setState({
      worked: hoursWorked
    });
    
    this.appendArray(hoursWorked);
    
  }

  hoursWorked() {
    var diff = this.stopTime - this.curTime;
    console.log(diff);
  }


  componentDidMount() {

    setInterval(() => (

      this.setState(
        { curTime: new Date().toLocaleString() }

      )
    ), 1000);
  }
 
  Calcpayroll() {
    var y=this.state.x;
    var totalhours=0;
    var work = this.state.worked;
    var totalhours;
    HourDay[y]=work;
    for(var x = 0; x < 21; x++){
      totalhours = totalhours + HourDay[x];
      // console.log("Array Content",HourDay)
    }
    this.setState({
      total:totalhours
    });

    global.amount= totalhours * 6 * 0.89;
    this.setState({
      payroll:amount  
    });      
  }


 render() {
      return (
        
        <View style={styles.container}>
          <View style={styles.top}>
          <Text style={styles.titleText}>Welcome to Payroll Calculator</Text>
          </View>

          <ImageBackground source={image} style={{width:1537 , height:900 }}>
          
          
          <View style={styles.box}>
          <Text style={styles.boxText}>{'\n'}Payroll System</Text>
          <Text style={styles.boxText}>{'\n'}Time: {this.state.curTime}</Text>
          
         
              
              <View style={styles.calcButton}>
                <View style={styles.timeinoutButton}>
                  <TouchableOpacity onPress={this.timeIn}><Text style={styles.buttonText}>Time-in</Text></TouchableOpacity>
                </View>
                <Text style={styles.resultText}>{'\n'}</Text>
                <View style={styles.timeinoutButton}>
                  <TouchableOpacity onPress={this.timeOut}><Text style={styles.buttonText}>Time-out</Text></TouchableOpacity>
                </View>  
                <Text style={styles.resultText}>{'\n'}{'\n'}{'\n'}</Text>
                <View style={styles.timeinoutButton}>
                <Button onPress={() => this.Calcpayroll()} title="Calculate" />
                  
                </View>
              </View>
              
          </View>

          <View style={styles.resultBox}>
          <Text style={styles.resultText}>{'\n'}{'\n'}{'\n'}Hours Worked: {this.state.worked}</Text>
          <Text style={styles.resultText}>The total salary is RM {this.state.payroll}</Text>
          </View>
                

          </ImageBackground>
          <StatusBar style="auto" />
        </View>
      );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#300030',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    color: '#fff', 
    fontSize: 40, 
    marginTop: 1 , 
    marginRight: 1 , 
    fontFamily: 'Nexa Bold' , 
    opacity:1
  },

  input: {
    marginLeft:650,
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    backgroundColor: 'white'
  },

  calcButton: {
    width:200,
    marginLeft: 630,
    marginTop: 70,
  },

  buttonText: {
    color: '#700070',
    fontSize: 20, 
    fontFamily: 'Nexa Bold' , 
    opacity:1,
    textAlign: 'center',
  },

  box: {
    marginTop: 100, 
    marginRight: 70,
  },

  boxText: {
    color: '#fff', 
    fontSize: 20, 
    fontFamily: 'Nexa Bold' , 
    opacity:1,
    textAlign: 'center',
  },

  resultBox: {
    width: 500,
    height: 200,
    marginLeft:500,
    marginTop: 70,
    backgroundColor: '#ffbbff',
    borderRadius: 40,
  },

  resultText: {
    color: '#700070', 
    fontSize: 20 , 
    fontFamily: 'Nexa Bold' ,
    textAlign: 'center',
  },

  timeinoutButton: {
    width: 150,
    height: 35,
    backgroundColor: '#fff',
    marginLeft: 30,
    borderRadius: 10,
  }
});
