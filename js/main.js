import { ONLY_APAHABETS_NO_SPECIAL_CHARACTERS, EMAIL, ONLY_NUMBERS } from './variables-patterns.js';
import { DataApi } from './call-api.js';
import { Validations } from './validations.js';
import { CaptureInputs } from './capture-inputs.js';
import { ShowElements } from './show-elements.js';

DataApi.getAPI();
Validations.validateLocalStorageData();
Validations.blockCharactersInput(document.getElementById('names'), ONLY_APAHABETS_NO_SPECIAL_CHARACTERS);
Validations.blockCharactersInput(document.getElementById('lastName'), ONLY_APAHABETS_NO_SPECIAL_CHARACTERS);
Validations.blockCharactersInput(document.getElementById('email'), EMAIL);
Validations.blockCharactersInput(document.getElementById('numberPhone'), ONLY_NUMBERS);
Validations.blockCharactersInput(document.getElementById('amount'), ONLY_NUMBERS);
Validations.blockCharactersInput(document.getElementById('term'), ONLY_NUMBERS);
Validations.blockCharactersInput(document.getElementById('numberYearsIC'), ONLY_NUMBERS);
Validations.validateLimitBank();
Validations.validateInputFilledIn();
CaptureInputs.captureRadioInput();
ShowElements.showIC();
Validations.eventValidateCalculate();
CaptureInputs.captureCalculateInput();
CaptureInputs.captureSubmitInput();





