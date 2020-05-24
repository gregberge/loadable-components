// We simulate that "moment" is called in "A" and "B"
import moment from 'moment'

const B = () => 'B'

// We keep a reference to prevent uglify remove
B.moment = moment

export default B
