import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const CustomLoader = (props) => (
    <div>
      <Dimmer active inverted  size='big'>
        <Loader inverted/>
      </Dimmer>
    </div>

)

export default CustomLoader