class BoardNote
  attr_accessor :text, :x, :y

  def initialize
    @x = 64 * rand(6)
    @y = 64 * rand(6) + 64

    @text = [
        'hmm',
        'hi',
        'hello',
        'wow',
        'ok'
    ].sample
  end

  def serialize
    {
      text: @text,
      type: 'BoardNote',
      x: @x,
      y: @y
    }
  end
end