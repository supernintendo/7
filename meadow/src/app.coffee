class Container
    constructor: ->
        @surface = d3
            .select 'body'
            .append 'svg'
            .attr 'width', 300
            .attr 'height', 300
        @resizeContainer()

    resizeContainer: ->
        @surface
            .attr 'width', window.innerWidth
            .attr 'height', window.innerHeight

class Tree
    constructor: (@container, @spec) ->
        @branches = []
        @counter = 0

    branchFrom: (lastBranch, direction) ->
        branch =
            x: lastBranch.x2
            y: lastBranch.y2
            x2: lastBranch.x2 + (@spec.branchLength * Math.cos(Math.PI * @spec.branchAngle/180)) * direction
            y2: lastBranch.y2 + @spec.branchLength * Math.sin(Math.PI * @spec.branchAngle/180)
            color: @spec.branchColor
            lineCap: 'round'
            width: @spec.branchWidth
            speed: @spec.growSpeed
            ease: @spec.ease

    branchOff: (lastBranch)  ->
        if @counter <= @spec.totalLength
            @grow @branchFrom(lastBranch, @spec.divergence)
            @grow @branchFrom(lastBranch, @spec.divergence * -1)
            @counter += 1
            @spec.branchAngle -= 15

    drawBranch: (index) ->
        branch = @branches[index]

        @container.surface
            .append 'line'
            .attr 'x1', branch.x
            .attr 'y1', branch.y
            .attr 'x2', branch.x
            .attr 'y2', branch.y
            .attr 'stroke', branch.color
            .attr 'stroke-linecap', branch.lineCap
            .attr 'stroke-width', branch.width
            .transition()
            .duration branch.speed
            .ease branch.ease
            .attr 'x2', branch.x2
            .attr 'y2', branch.y2
            .each 'end', @branchOff.bind(@, branch)

    grow: (branch) ->
        @newBranch(branch)
        @drawBranch(@branches.length - 1)

    newBranch: (spec) ->
        @branches.push spec

    stump: ->
        stump =
            x: @spec.x
            y: @spec.y
            x2: @spec.x
            y2: @spec.y - 60
            color: @spec.stumpColor
            lineCap: 'square'
            width: @spec.stumpWidth
            speed: @spec.growSpeed
            ease: 'cubic'
        stump

browns = [
    '#49281F',
    '#564334',
    '#594433',
    '#A68C69'
]
eases = [
    'linear',
    'quad',
    'cubic',
    'sin',
    'exp',
    'circle',
    'bounce'
]
greens = [
    '#9E9A41',
    '#758918',
    '#9BA657',
    '#808F12',
    '#2A5C0B',
    '#042608',
    '#C0D878',
    '#A8C060',
    '#547239',
    '#264D34'
]
treeCount = 0
randomTree = (x, y) ->
    tree =
        branchAngle: Math.random() * 90 * -1
        branchColor: greens[Math.floor(Math.random() * greens.length - 1)]
        branchLength: Math.random() * 40
        branchWidth: Math.random() * 18 + 10
        divergence: Math.random() * -0.5 * 2
        ease: eases[Math.floor(Math.random() * eases.length)]
        growSpeed: Math.random() * 1200 + 100
        stumpColor: browns[Math.floor(Math.random() * browns.length - 1)]
        stumpWidth: Math.random() * 20 + 5
        totalLength: Math.random() * 8 + 5
        x: x
        y: y

# Grow trees
container = new Container
x_poses = [1..30].map (i) -> Math.random() * window.innerWidth
y_poses = [1..30].map (i) -> Math.random() * window.innerHeight
y_poses = y_poses.sort (a, b) -> a - b

setInterval =>
    if treeCount < 30
        tree = new Tree(container, randomTree(x_poses[treeCount], y_poses[treeCount]))
        tree.grow tree.stump()
        treeCount += 1
, 100
