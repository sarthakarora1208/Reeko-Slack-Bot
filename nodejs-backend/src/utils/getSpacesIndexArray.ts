export const getSpacesIndexArray = (sentence: string) => {
  let indices = [];
  let returnedIndices = [];
  let first40: number[] = [];
  let second40: number[] = [];
  let third40: number[] = [];
  let fourth40: number[] = [];
  let fifth40: number[] = [];
  let sixth40: number[] = [];
  let seventh40: number[] = [];
  let eighth40: number[] = [];
  let ninth40: number[] = [];
  let tenth40: number[] = [];
  let eleventh40: number[] = [];
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === ' ') indices.push(i);
  }
  //console.log(indices);
  if (sentence.length >= 40) {
    first40 = indices.filter((index) => {
      return index > 20 && index < 40;
    });
    if (first40.length > 0) {
      returnedIndices.push(first40[first40.length - 1]);
    } else {
      if (indices.includes(41)) {
        returnedIndices.push(41);
      } else if (indices.includes(42)) {
        returnedIndices.push(42);
      } else {
        returnedIndices.push(40);
      }
    }
  }
  if (sentence.length >= 80) {
    second40 = indices.filter((index) => {
      return index >= 60 && index < 80;
    });
    if (second40.length > 0) {
      returnedIndices.push(second40[second40.length - 1]);
    } else {
      if (indices.includes(81)) {
        returnedIndices.push(81);
      } else if (indices.includes(82)) {
        returnedIndices.push(82);
      } else {
        returnedIndices.push(80);
      }
    }
  }
  if (sentence.length >= 120) {
    third40 = indices.filter((index) => {
      return index >= 100 && index < 120;
    });
    if (third40.length > 0) {
      returnedIndices.push(third40[third40.length - 1]);
    } else {
      if (indices.includes(121)) {
        returnedIndices.push(121);
      } else if (indices.includes(122)) {
        returnedIndices.push(122);
      } else {
        returnedIndices.push(120);
      }
    }
  }
  if (sentence.length >= 160) {
    fourth40 = indices.filter((index) => {
      return index >= 140 && index < 160;
    });
    if (fourth40.length > 0) {
      returnedIndices.push(fourth40[fourth40.length - 1]);
    } else {
      if (indices.includes(161)) {
        returnedIndices.push(161);
      } else if (indices.includes(162)) {
        returnedIndices.push(162);
      } else {
        returnedIndices.push(160);
      }
    }
  }
  if (sentence.length >= 200) {
    fifth40 = indices.filter((index) => {
      return index >= 180 && index < 200;
    });
    if (fifth40.length > 0) {
      returnedIndices.push(fifth40[fifth40.length - 1]);
    } else {
      if (indices.includes(201)) {
        returnedIndices.push(201);
      } else if (indices.includes(202)) {
        returnedIndices.push(202);
      } else {
        returnedIndices.push(200);
      }
    }
  }
  if (sentence.length >= 240) {
    sixth40 = indices.filter((index) => {
      return index >= 220 && index < 240;
    });
    if (sixth40.length > 0) {
      returnedIndices.push(sixth40[sixth40.length - 1]);
    } else {
      if (indices.includes(241)) {
        returnedIndices.push(241);
      } else if (indices.includes(242)) {
        returnedIndices.push(242);
      } else {
        returnedIndices.push(240);
      }
    }
  }
  if (sentence.length >= 280) {
    seventh40 = indices.filter((index) => {
      return index >= 260 && index < 280;
    });
    if (seventh40.length > 0) {
      returnedIndices.push(seventh40[seventh40.length - 1]);
    } else {
      if (indices.includes(281)) {
        returnedIndices.push(281);
      } else if (indices.includes(282)) {
        returnedIndices.push(282);
      } else {
        returnedIndices.push(280);
      }
    }
  }
  if (sentence.length >= 320) {
    eighth40 = indices.filter((index) => {
      return index >= 300 && index < 320;
    });
    if (eighth40.length > 0) {
      returnedIndices.push(eighth40[eighth40.length - 1]);
    } else {
      if (indices.includes(321)) {
        returnedIndices.push(321);
      } else if (indices.includes(322)) {
        returnedIndices.push(322);
      } else {
        returnedIndices.push(320);
      }
    }
  }
  if (sentence.length >= 360) {
    ninth40 = indices.filter((index) => {
      return index >= 340 && index < 360;
    });
    if (ninth40.length > 0) {
      returnedIndices.push(ninth40[ninth40.length - 1]);
    } else {
      if (indices.includes(361)) {
        returnedIndices.push(361);
      } else if (indices.includes(362)) {
        returnedIndices.push(362);
      } else {
        returnedIndices.push(360);
      }
    }
  }
  if (sentence.length >= 400) {
    tenth40 = indices.filter((index) => {
      return index >= 380 && index < 400;
    });
    if (tenth40.length > 0) {
      returnedIndices.push(tenth40[tenth40.length - 1]);
    } else {
      if (indices.includes(401)) {
        returnedIndices.push(401);
      } else if (indices.includes(402)) {
        returnedIndices.push(402);
      } else {
        returnedIndices.push(400);
      }
    }
  }
  if (sentence.length >= 440) {
    eleventh40 = indices.filter((index) => {
      return index >= 420 && index < 440;
    });
    if (eleventh40.length > 0) {
      returnedIndices.push(eleventh40[eleventh40.length - 1]);
    } else {
      if (indices.includes(441)) {
        returnedIndices.push(441);
      } else if (indices.includes(442)) {
        returnedIndices.push(442);
      } else {
        returnedIndices.push(440);
      }
    }
  }
  console.log(returnedIndices);
  return returnedIndices;
};
