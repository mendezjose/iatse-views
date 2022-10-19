import React, { useState } from "react"
import CheckboxTree from "react-checkbox-tree"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import "../font-awesome/css/font-awesome.min.css"
import "react-checkbox-tree/lib/react-checkbox-tree.css"
import "bootstrap/dist/css/bootstrap.min.css"

const Winmill = () => {
  const nodes = [
    {
      value: "IATSE Home",
      label: "IATSE Home",
      children: [
        { value: "error", label: "Error" },
        {
          value: "home",
          label: "Home",
          children: [
            {
              value: "Create Role",
              label: "Create Role",
            },
            {
              value: "Modify Role",
              label: "Modify Role",
            },
            {
              value: "Create User",
              label: "Create User",
            },
            {
              value: "Assign Role to User",
              label: "Assign Role to User",
            },
            {
              value: "Change Password",
              label: "Change Password",
            },
            {
              value: "Application User Report",
              label: "Application User Report",
            },
            {
              value: "Member Address File",
              label: "Member Address File",
            },
            {
              value: "Impersonate Admin",
              label: "Impersonate Admin",
            },
            {
              value: "Unlock User",
              label: "Unlock User",
            },
            {
              value: "Revoke User",
              label: "Revoke User",
            },
            {
              value: "Reset User",
              label: "Reset User",
            },
            {
              value: "Update User Info",
              label: "Update User Info",
            },
            {
              value: "Change Email",
              label: "Change Email",
            },
          ],
        },
      ],
    },
  ]

  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])

  return (
    <Container>
      <div className="p-5">
        <h4 class="mb-6">Create Role</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control type="text" placeholder="Enter role" />
            <Form.Text className="text-muted">Help text example.</Form.Text>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter description" />
            <Form.Text className="text-muted">Help text example.</Form.Text>
          </Form.Group>
        </Form>

        <Form.Label>
          Please Select The Screen(s) to Authorized Access For This Role
        </Form.Label>

        <div className="tree">
          {/* <div>
          Please Select The Screen(s) to Authorized Access For This Role
        </div> */}

          <CheckboxTree
            icons={{
              check: <i class="fa fa-check-square" aria-hidden="true"></i>,
              halfCheck: (
                <i
                  class="fa fa-check-square"
                  aria-hidden="true"
                  style={{ opacity: 0.5 }}
                ></i>
              ),
            }}
            nodes={nodes}
            checked={checked}
            expanded={expanded}
            onCheck={checked => setChecked(checked)}
            onExpand={expanded => setExpanded(expanded)}
            showNodeIcon={false}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "2rem",
          }}
        >
          <Button variant="secondary" type="submit">
            Cancel
          </Button>

          <Button
            style={{ marginLeft: "1rem" }}
            variant="primary"
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default Winmill
