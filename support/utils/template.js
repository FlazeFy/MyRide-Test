Cypress.Commands.add('templateGet', (code, obj, is_paginate) => {
    let dataType

    // Builder
    if(is_paginate){
        dataType = 'object'
    } else {
        dataType = 'array'
    }

    // Test
    expect(obj.status).to.equal(code)
    expect(obj.body.message).to.be.a('string')

    if(is_paginate == false && code == 200){
        expect(obj.body.data).to.be.a(dataType)
    }

    if(is_paginate == true && code == 200){
        expect(obj.body.data.data).to.be.a('array')
    }
});

Cypress.Commands.add('templatePost', (obj, builder) => {
    // Test
    expect(obj.status).to.equal(201)
    expect(obj.body.message).to.be.a('string')
    
    if(builder){
        Object.entries(builder).forEach(([key, value]) => {
            expect(obj.body.data[key]).to.eq(value)
        });
    }

    // expect(obj.body.data).to.have.property('id')
    // expect(obj.body.data).to.have.property('created_at')
    // expect(typeof obj.body.data.id).to.eq('string')
    // expect(typeof obj.body.data.created_at).to.eq('string')
});

Cypress.Commands.add('templateDelete', (obj) => {
    // Test
    expect(obj.status).to.equal(200)
    expect(obj.body.message).to.be.a('string')
});

Cypress.Commands.add('templatePut', (obj) => {
    // Test
    expect(obj.status).to.equal(200)
    expect(obj.body.message).to.be.a('string')

    expect(obj.body).to.have.property('rows_affected')
    expect(typeof obj.body.rows_affected).to.eq('number')
});

Cypress.Commands.add('templatePagination', (url, max) => {
    for (let index = 1; index <= max; index++) {
        cy.request({
            method: 'GET', 
            url: url + '?page='+index,
        }).then(dt => {
            expect(dt.status).to.equal(200)
        })
    }
});

Cypress.Commands.add('templateValidateColumn', (data, obj, dataType, nullable) => {
    const dataArray = Array.isArray(data) ? data : [data];

    dataArray.forEach((item) => {
        expect(item).to.be.an('object')
        obj.forEach((field) => {
            expect(item).to.have.property(field)
            if (nullable && item[field] === null) {
                expect(item[field]).to.be.null
            } else {
                expect(item[field]).to.be.a(dataType)

                if(dataType === "number"){
                    if(Number.isInteger(item[field])){
                        expect(item[field] % 1).to.equal(0)
                    } else {
                        expect(item[field] % 1).to.not.equal(0)
                    }
                }
            }
        });
    });
});

Cypress.Commands.add('templateValidateContain', (data, list, target) => {
    data.forEach((item, idx) => {
        expect(item).to.be.an('object')
        expect(list,`Column ${target} with value = ${item[target]} must contain in list. Index Data : ${idx}`).to.include(item[target])
    });
});

Cypress.Commands.add('templateOrdering', (data, target, typeOrdering, typeData) => {
    data.forEach((item,idx)=> {
        expect(item).to.be.an('object')

        if(idx < data.length - 1){
            if(typeData == 'number'){
                const current_value = parseInt(item[target]) 
                const next_value = parseInt(data[idx+1][target])

                if(typeOrdering == 'ascending'){
                    expect(next_value, 
                        `Column ${target} with current value (Idx : ${idx}) = ${current_value} must be lower than or equal to next value (Idx : ${idx+1}) = ${next_value}`
                        ).to.be.least(current_value)
                } else if(typeOrdering == 'descending'){
                    expect(next_value,
                        `Column ${target} with current value (Idx : ${idx}) = ${current_value} must be greater than or equal to next value (Idx : ${idx+1}) = ${next_value}`
                        ).to.be.most(current_value)
                }
            } 
        }
    })
})

Cypress.Commands.add('templateValidateMaxMin', (data, obj) => {
    const dataArray = Array.isArray(data) ? data : [data];

    dataArray.forEach((item) => {
        obj.forEach((field) => {
            const col_name = field['column_name']
            const data_type = field['data_type']
            const max = field['max']
            const min = field['min']
            const nullable = field['nullable']
            const props_msg = `${data_type == 'number' ? 'value' : data_type == 'string' ? 'character length' : ''}`

            if (!nullable || item[col_name] != null) {
                let data_length = null 

                if(data_type === "number"){
                    data_length = item[col_name]
                } else if(data_type === "string"){
                    data_length = item[col_name].length
                }

                if(max && min && max == min){
                    expect(data_length, `Column ${col_name} ${props_msg} must equal to ${max}`).to.be.equal(max)
                } else {
                    if (max !== null && max !== undefined) {
                        expect(data_length, `Column ${col_name} must have ${props_msg} less than or equal to ${max}`).to.be.at.most(max)
                    }
                    if (min !== null && min !== undefined) {
                        expect(data_length, `Column ${col_name} must have ${props_msg} more than or equal to ${min}`).to.be.at.least(min)
                    }
                }
            }
        });
    });
})

Cypress.Commands.add('templateValidateDateTime', (data, obj) => {
    const dataArray = Array.isArray(data) ? data : [data];

    dataArray.forEach((item) => {
        obj.forEach((field) => {
            const col_name = field['column_name']
            const date_type = field['date_type']
            const nullable = field['nullable']

            if (!nullable || item[col_name] != null) {
                if (date_type === "datetime") {
                    expect(item[col_name]).to.match(
                        /^(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})$/,
                        `${col_name} must be a valid datetime (ISO 8601 or SQL format)`
                    );                    
                } else if (date_type === "time") {
                    expect(item[col_name]).to.match(/^\d{2}:\d{2}:\d{2}$/, `${col_name} must be a valid time`);
                } else if (date_type === "date") {
                    expect(item[col_name]).to.match(/^\d{4}-\d{2}-\d{2}$/, `${col_name} must be a valid date`);
                }
            }
        });
    });
})

Cypress.Commands.add('templateE2ELogin', (username, password) => {
    const BASEURL = 'http://localhost:3000'
    const date = new Date().toISOString().replace(/:/g, '-')

    // Pre Condition : User Must Logged In To Their Account
    cy.visit(`${BASEURL}/`)
    cy.get('#username-input').type(username)
    cy.get('#password-input').type(password)
    cy.get('#submit-login-button').click()
    cy.get('.swal2-popup', { timeout: 5000 }).should('exist')
    .then(() => {
        cy.get('.swal2-popup').contains('button', 'Okay!').click()
    })
    cy.url().should('include', '/clothes')
    cy.screenshot(`TC-US-001_Pre Condition-${date}`)
})

Cypress.Commands.add('templateE2ELoginAPI', (username, password) => {
    return cy.request({
        method: 'POST', 
        url: 'api/v1/login',
        body: {
            username: username,
            password: password,
        },
    }).then(res => {
        expect(res.status).to.equal(200)
        const token = res.body.token
        return token
    });
});