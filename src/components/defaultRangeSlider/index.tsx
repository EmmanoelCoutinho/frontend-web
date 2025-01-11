import { defaultColors } from '@/constants/styles/defaultColors';
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';
import { useState } from 'react';

interface IPropsDefaultRangeSlider {
  sliderCustomColor?: string;
}

function DefaultRangeSlider({ sliderCustomColor }: IPropsDefaultRangeSlider) {
  const [sliderValue, setSliderValue] = useState([0, 1000000]);

  return (
    <RangeSlider
      aria-label={['min', 'max']}
      defaultValue={[0, 1000000]}
      min={0}
      max={1000000}
      step={10000}
      onChange={(val) => setSliderValue(val)}
    >
      {/* <RangeSliderMark value={250000} mt="1" ml="-2.5" fontSize="sm">
        R$ 250.000
      </RangeSliderMark>
      <RangeSliderMark value={500000} mt="1" ml="-2.5" fontSize="sm">
        R$ 500.000
      </RangeSliderMark>
      <RangeSliderMark value={750000} mt="1" ml="-2.5" fontSize="sm">
        R$ 750.000
      </RangeSliderMark> */}
      <RangeSliderMark
        value={sliderValue[0]}
        textAlign="center"
        bg={defaultColors.purple}
        color="white"
        mt="-10"
        ml="-5"
        w="24"
      >
        R$ {sliderValue[0].toLocaleString('pt-BR')}
      </RangeSliderMark>
      <RangeSliderMark
        value={sliderValue[1]}
        textAlign="center"
        bg={defaultColors.purple}
        color="white"
        mt="-10"
        ml="-50"
        w="24"
      >
        R$ {sliderValue[1].toLocaleString('pt-BR')}
      </RangeSliderMark>
      <RangeSliderTrack bg="red.100">
        <RangeSliderFilledTrack bg={defaultColors.purple} />
      </RangeSliderTrack>
      <RangeSliderThumb
        boxSize={6}
        index={0}
        backgroundColor={sliderCustomColor ?? 'white'}
      >
        {/* <Box color="tomato" as={MdGraphicEq} /> */}
      </RangeSliderThumb>
      <RangeSliderThumb
        boxSize={6}
        index={1}
        backgroundColor={sliderCustomColor ?? 'white'}
      >
        {/* <Box color="tomato" as={MdGraphicEq} /> */}
      </RangeSliderThumb>
    </RangeSlider>
  );
}

export default DefaultRangeSlider;
