const assert = require('assert').strict;

const PKG = require("../../src/core/attributes.js");

describe('Attributes', function() {

  const MOCK_OPTIONS = {
    label: 'Mocked Attributes',
    willpower: 17,
    intelligence: 17,
    charisma: 17,
    perception: 17,
    memory: 17
  }

  describe('#constructor', function() {

    it('should create an Attributes instance', function() {
      const target = new PKG.Attributes();
      assert(target instanceof PKG.Attributes)
    });

    it('should create an Attributes instance with given options', function() {
      const target = new PKG.Attributes(MOCK_OPTIONS);
      assert.equal(MOCK_OPTIONS.label, target.label());
      assert.equal(MOCK_OPTIONS.perception, target.perception());
      assert.equal(MOCK_OPTIONS.memory, target.memory());
      assert.equal(MOCK_OPTIONS.willpower, target.willpower());
      assert.equal(MOCK_OPTIONS.intelligence, target.intelligence());
      assert.equal(MOCK_OPTIONS.charisma, target.charisma());
    })
  })


  describe('#label', function() {

    const MOCK = new PKG.Attributes(MOCK_OPTIONS);
    it('should get label when invoke it without arguments', function() {
      assert.equal(MOCK.label(), MOCK_OPTIONS.label);
    })

    it('should set label when invoke it with illegal arguments', function() {
      const CHANGED_LABEL = "ChangedLabel";
      assert.notEqual(MOCK.label(), CHANGED_LABEL);
      MOCK.label(CHANGED_LABEL);
      assert.equal(MOCK.label(), CHANGED_LABEL);
    })
  })

  describe('#perception', function() {

    const CHANGED_VALUE = 18;
    const MOCK = new PKG.Attributes(MOCK_OPTIONS);
    it('should get perception when invoke it without arguments', function() {
      assert.equal(MOCK.perception(), MOCK_OPTIONS.perception);
    })

    it('should set perception when invoke it with illegal arguments', function(){
      assert.notEqual(MOCK.perception(), CHANGED_VALUE);
      MOCK.perception(CHANGED_VALUE);
      assert.equal(MOCK.perception(), CHANGED_VALUE);
    })
  })

});


describe('create', function() {

  it('should create as what we expect', function() {

    const MOCK_DATA1 = {
      label:'MOCK_DATA1',
      perception: 10,
      memory: 10,
      charisma: 10,
      willpower: 10,
      intelligence: 10
    }

    const MOCK_DATA2= {
      label:'MOCK_DATA2',
      perception: 8,
      memory: 8,
      charisma: 8,
      willpower: 8,
      intelligence: 8
    }

    const target = PKG.create(
      MOCK_DATA1.label,
      MOCK_DATA1.perception,
      MOCK_DATA1.memory,
      MOCK_DATA1.willpower,
      MOCK_DATA1.intelligence,
      MOCK_DATA1.charisma);

      assert.equal(target.label(), MOCK_DATA1.label, 'label');
      assert.equal(target.perception(), MOCK_DATA1.perception, 'perception');
      assert.equal(target.memory(), MOCK_DATA1.memory, 'memory');
      assert.equal(target.willpower(), MOCK_DATA1.willpower, 'willpower');
      assert.equal(target.intelligence(), MOCK_DATA1.intelligence, 'intelligence');
      assert.equal(target.charisma(), MOCK_DATA1.charisma, 'charisma');
  })

})

describe('AttributesSimulaor', function() {

  const MOCK1 = PKG.create('Mock1', 1,2,3,4,5);
  const MOCK2 = PKG.create('Mock2', 3,3,3,3,0);

  const simulator = new PKG.Simulator();
  simulator.add(MOCK1);
  simulator.add(MOCK2)


  it('#add should work as we expect', function() {
    const target = simulator.calculate();
    assert(target instanceof PKG.Attributes);
    assert.equal(target.perception(), MOCK1.perception() + MOCK2.perception());
    assert.equal(target.memory(), MOCK1.memory() + MOCK2.memory());
    assert.equal(target.willpower(), MOCK1.willpower() + MOCK2.willpower());
    assert.equal(target.intelligence(), MOCK1.intelligence() + MOCK2.intelligence());
    assert.equal(target.charisma(), MOCK1.charisma() + MOCK2.charisma());
  })

  it('#remove should work as we expect', function() {
    simulator.remove(MOCK2.label());

    const target = simulator.calculate();
    assert(target instanceof PKG.Attributes);
    assert.equal(target.perception(), MOCK1.perception());
    assert.equal(target.memory(), MOCK1.memory());
    assert.equal(target.willpower(), MOCK1.willpower());
    assert.equal(target.intelligence(), MOCK1.intelligence());
    assert.equal(target.charisma(), MOCK1.charisma());
  });

  it('#reset should work as we expect', function() {
    simulator.reset();
    simulator.add(MOCK2);

    const target = simulator.calculate();
    assert(target instanceof PKG.Attributes);
    assert.equal(target.perception(), MOCK2.perception());
    assert.equal(target.memory(), MOCK2.memory());
    assert.equal(target.willpower(), MOCK2.willpower());
    assert.equal(target.intelligence(), MOCK2.intelligence());
    assert.equal(target.charisma(), MOCK2.charisma());
  })

})
