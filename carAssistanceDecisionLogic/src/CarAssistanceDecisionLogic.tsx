import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { CarAssistanceDecisionLogicContainerProps } from "../typings/CarAssistanceDecisionLogicProps";

import "./ui/CarAssistanceDecisionLogic.css";


  

export function CarAssistanceDecisionLogic({ sampleText }: CarAssistanceDecisionLogicContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}



interface TrafficLightData {
    objectType: 'traffic_light';
    status: 'red' | 'yellow' | 'green';
    distance: number;
  }
  
  interface ZebraCrossingData {
    objectType: 'zebra_crossing';
    distance: number;
    pedestrianOnCrossing: boolean;
    pedestrianOnLeftSide: boolean;
    pedestrianOnRightSide: boolean;
  }
  
  interface ObjectData {
    objectType: 'object';
    label: string;
    distance: number;
  }
  
  type SensorData = TrafficLightData | ZebraCrossingData | ObjectData;
  
  interface CarData {
    carSpeed: number;
    decelerationValue: number;
  }
  
  interface DecisionResult {
    decision: string;
    timeToStop: number;
    percentageOfBrake: number;
  }
  
  interface DecisionProps {
    sensorData: SensorData[];
    carData: CarData;
  }
  
  const calculateTimeToStop = (carSpeed: number, decelerationValue: number): number => {
    return carSpeed / decelerationValue;
  };
  
  const calculatePercentageOfBrake = (decelerationValue: number, gravity: number): number => {
    return (decelerationValue / gravity) * 100;
  };
  
  const makeDecision = ({ sensorData, carData }: DecisionProps): DecisionResult => {
    // Separate the data into different arrays based on object types
    const trafficLights = sensorData.filter(
      (data) => data.objectType === 'traffic_light'
    ) as TrafficLightData[];
    const zebraCrossings = sensorData.filter(
      (data) => data.objectType === 'zebra_crossing'
    ) as ZebraCrossingData[];
    const objects = sensorData.filter((data) => data.objectType === 'object') as ObjectData[];
  
    // Sort the data arrays based on distance
    trafficLights.sort((a, b) => a.distance - b.distance);
    zebraCrossings.sort((a, b) => a.distance - b.distance);
    objects.sort((a, b) => a.distance - b.distance);
  
    // Check conditions for decision making
    const carSpeed = carData.carSpeed;
    const decelerationValue = carData.decelerationValue;
    const noObstacles = objects.length === 0;
    const greenLight = trafficLights.length === 0 || trafficLights[0].status === 'green';
    const freeZebraCrossing = zebraCrossings.length === 0 ||
      (!zebraCrossings.some(zc => zc.pedestrianOnCrossing || zc.pedestrianOnLeftSide || zc.pedestrianOnRightSide));
  
    // Calculate time to stop and percentage of brake
    const gravity = 9.81; // m/s², acceleration due to gravity can be further extended with friction between car and road
    const timeToStop = calculateTimeToStop(carSpeed, decelerationValue);
    const percentageOfBrake = calculatePercentageOfBrake(decelerationValue, gravity);
  
    // Make a decision
    let decision = '';
    if (noObstacles && greenLight && freeZebraCrossing && carSpeed > decelerationValue) {
      decision = 'Car can move forward.';  
    } else {
      decision = 'Car needs to apply brakes.';
    }
  
    return {
      decision,
      timeToStop,
      percentageOfBrake,
    };
  };
  
  const DecisionComponent: React.FC<DecisionProps> = ({ sensorData, carData }) => {
    const { decision, timeToStop, percentageOfBrake } = makeDecision({ sensorData, carData });
  
    return (
      <div>
        <h2>Decision: {decision}</h2>
        {decision === 'Car needs to apply brakes.' && (
          <div>
            <p>Time to stop: {timeToStop.toFixed(2)} seconds</p>
            <p>Percentage of brake: {percentageOfBrake.toFixed(2)}%</p>
          </div>
        )}
      </div>
    );
  };
/*   @testing purpose 
  // Example usage:
  const sensorData: SensorData[] = [
    { objectType: 'traffic_light', status: 'green', distance: 10 },
    { objectType: 'zebra_crossing', distance: 5, pedestrianOnCrossing: false, pedestrianOnLeftSide: false, pedestrianOnRightSide: false },
    { objectType: 'object', label: 'Hurdle', distance: 20 },
  ];
  const carData: CarData = {
    carSpeed: 40,
    decelerationValue: 10,
  };
  
  const App: React.FC = () => {
    return (
      <div>
        <DecisionComponent sensorData={sensorData} carData={carData} />
      </div>
    );
  }; 
   */
