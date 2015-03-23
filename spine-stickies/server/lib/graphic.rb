class BoardGraphic
  attr_accessor :image, :x, :y

  def initialize
    @x = 64 * rand(6)
    @y = 64 * rand(6) + 64

    @image = 'tumblr_static_catbread.gif'
  end

  def serialize
    {
      image: @image,
      type: 'BoardGraphic',
      x: @x,
      y: @y
    }
  end
end