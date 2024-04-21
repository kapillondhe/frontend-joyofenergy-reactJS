const calculateConsumption = (readings)=> readings.reduce((a,c)=>{
    return a+c.value;
},0);


export default calculateConsumption;