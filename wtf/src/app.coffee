# State
trees = []
x_poses = []
y_poses = []

#
# D3 Canvas
#
class Container
    constructor: ->
        @surface = d3
            .select 'body'
            .append 'svg'
            .attr 'id', 'canvas'
            .attr 'width', 300
            .attr 'height', 300
        @resizeContainer()

    clear: ->
        @surface
            .selectAll("*")
            .remove()

    resizeContainer: ->
        @surface
            .attr 'width', window.innerWidth
            .attr 'height', window.innerHeight

#
# A growing tree.
#
class Tree
    constructor: (@container, @spec) ->
        @branches = []
        @counter = 0
        @done = false
        @grow(@stump())

    # Given a branch, create a new branch
    # that starts at and grows from that
    # branch's origin.
    branchFrom: (lastBranch, direction) ->
        branch =
            x: lastBranch.x2
            y: lastBranch.y2
            x2: lastBranch.x2 - (@spec.branchLength * Math.cos(Math.PI * @spec.branchAngle/180)) * direction
            y2: lastBranch.y2 - @spec.branchLength * Math.sin(Math.PI * @spec.branchAngle/180)
            color: randomColor({
                luminosity: 'bright'
                hue: 'blue'
            })
            lineCap: 'round'
            width: @spec.branchWidth
            speed: @spec.growSpeed
            ease: @spec.ease

    # Given a branch, create a new branch if
    # the counter is lower than the maximum
    # length.
    branchOff: (lastBranch)  ->
        if @counter <= @spec.totalLength
            @grow @branchFrom(lastBranch, @spec.divergence)
            @grow @branchFrom(lastBranch, @spec.divergence * -1)
            @counter += 1
            @spec.branchAngle -= 15
        else
            if not @done
                growTree()
                @done = true

    # Given an index, use the spec in the
    # branches array to draw a single,
    # growing line.
    drawBranch: (index) ->
        branch = @branches[index]

        @container.surface
            .append 'line'
            .attr 'class', 'branch'
            .attr 'x1', branch.x
            .attr 'y1', branch.y
            .attr 'x2', branch.x
            .attr 'y2', branch.y
            .attr 'stroke', branch.color
            .attr 'stroke-linecap', branch.lineCap
            .attr 'stroke-linejoin', 'miter'
            .attr 'stroke-width', branch.width
            .transition()
            .duration branch.speed
            .ease branch.ease
            .attr 'x2', branch.x2
            .attr 'y2', branch.y2
            .each 'end', @branchOff.bind(@, branch)

    # Create and draw a branch.
    grow: (branch) ->
        @newBranch(branch)
        @drawBranch(@branches.length - 1)

    # Given a spec, push that spec to the
    # branches array.
    newBranch: (spec) ->
        @branches.push spec

    # Spec for the base of the tree.
    stump: ->
        stump =
            x: @spec.x
            y: @spec.y
            x2: @spec.x
            y2: @spec.y - 60
            color: randomColor({
               luminosity: 'dark'
               hue: 'brown'
            })
            lineCap: 'square'
            width: @spec.stumpWidth
            speed: @spec.growSpeed
            ease: 'cubic'
        stump

# Randomize values for a Tree.
randomTree = (x, y) ->
    tree =
        branchAngle: Math.random() * 40 * -1 + 45
        branchLength: Math.random() * 300
        branchWidth: 2
        divergence: 1
        ease: 'linear'
        growSpeed: Math.random() * 1000 + 2000
        stumpWidth: 4
        totalLength: Math.random() * 100 + 200
        x: x
        y: y

# Grow a new tree at a random position.
growTree = ->
    if trees.length < 2
        spec = randomTree(x_poses[trees.length], y_poses[trees.length])
        trees.push new Tree(container, spec)

# Invert colors.
invert = ->
    html = document.documentElement

    if html.classList.contains('invert')
        html.classList.remove('invert')
    else
        html.classList.add('invert')

# Clear the window.
reset = ->
    trees = []
    d3.selectAll('line').transition()
    container.clear()
    startGrowing()

# This initializes the animation.
startGrowing = ->
    container.resizeContainer()
    x_poses = [1..2].map (i) -> Math.random() * window.innerWidth
    y_poses = [1..2].map (i) -> Math.random() * window.innerHeight + 120
    y_poses = y_poses.sort (a, b) -> a - b
    growTree()

# Clear window on resize.
window.addEventListener 'resize', reset

# Start growing.
container = new Container
startGrowing()
setInterval (->
    invert()
    reset()
), 45000
