import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const Sheet = () => {
    return (
        <div>
            <Row>
                <Col>
                    <Card style={{marginTop: '15px', height: '100px', width: '300px' }}>
                    </Card>
                </Col>
                <Col>
                    <Card style={{marginTop: '15px', height: '100px', width: '300px' }}>
                    </Card>
                </Col>

                <Col>
                    <Card style={{marginTop: '15px', height: '100px', width: '300px' }}>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Sheet