goog.provide('Blockly.CodeGen');

goog.require('Blockly.Generator');
goog.require('Blockly.utils.string');

Blockly.CodeGen = new Blockly.Generator('CodeGen');

Blockly.CodeGen.scrub_ = function(block, code, opt_thisOnly) {
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = opt_thisOnly ? '' : Blockly.CodeGen.blockToCode(nextBlock);
    return code + nextCode;
};

Blockly.CodeGen.scrubNakedValue = function(line) {
    return line + '\n';
};



Blockly.CodeGen['led_start'] = function(block) {
    return "|";
};

Blockly.CodeGen['led_animation'] = function(block) {
    var code = Blockly.CodeGen.statementToCode(block, 'ANIM');

    if (code === "")
        return "";

    return code + "x";
};



function GetLedEffectCode(block, effect) {
    var leds = Blockly.CodeGen.valueToCode(block, 'LEDS', 0);
    var brightness = block.getFieldValue('BRIGHTNESS');
    
    if (leds === "")
        return "";
    leds = JSON.parse(leds);
    
    var code = "e" + effect.toString(16) + brightness.toString(16);

    if (leds === true) {
        return code + "a";
    } else if (leds.x !== undefined) {
        return code + "s" + leds.y.toString(16) + leds.x.toString(16);
    } else {
        for (let x = 0; x < 16; x++)
            for (let y = 0; y < 16; y++)
                if (leds.leds[x][y].value)
                    code += "s" + y.toString(16) + x.toString(16);

        return code;
    }
}

Blockly.CodeGen['led_brightness'] = function(block) {
    return GetLedEffectCode(block, 0);
};

Blockly.CodeGen['led_dim'] = function(block) {
    return GetLedEffectCode(block, 1);
};

Blockly.CodeGen['led_brighten'] = function(block) {
    return GetLedEffectCode(block, 3);
};

Blockly.CodeGen['led_blink'] = function(block) {
    var dir = block.getFieldValue('DIR');
    return GetLedEffectCode(block, dir === "MIN" ? 5 : 7);
};



Blockly.CodeGen['led_move'] = function(block) {
    var direction = block.getFieldValue('DIR');
    var count = block.getFieldValue('COUNT');
    
    var dirNum = 0;

    if (direction.includes('W')) dirNum += 1;
    if (direction.includes('N')) dirNum += 2;
    if (direction.includes('E')) dirNum += 4;
    if (direction.includes('S')) dirNum += 8;
    
    return "p" + dirNum.toString(16) + count.toString(16);
};

Blockly.CodeGen['led_wait'] = function(block) {
    var time = Math.round(block.getFieldValue('BRIGHTNESS') / 15);
    var str = "0000" + time.toString(16);

    return "w" + str.substr(str.length - 4);
};

Blockly.CodeGen['led_stop'] = function(block) {
    return "wffff";
};



Blockly.CodeGen['led_all'] = function(block) {
    return ["true", 0];
};

Blockly.CodeGen['led_position'] = function(block) {
    var x = block.getFieldValue('X');
    var y = block.getFieldValue('Y');

    return [JSON.stringify({ x:x, y:y }), 0];
};

Blockly.CodeGen['led_select'] = function(block) {
    var leds = block.getFieldValue('LEDS');

    return [JSON.stringify(leds), 0];
};