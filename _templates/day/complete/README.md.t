---
inject: true
to: README.md
before: "</tbody>"
---

    <tr>
      <td>Day <%= day %></td>
      <td>
        <a href="https://github.com/pathto/repo/tree/main/src/<%= day %>">
          <img src="https://badgen.net/badge/<%= day %>/%E2%98%85<%= stars >= 2 ? '%E2%98%85' : '%E2%98%86' %>/green" alt="" />
        </a>
      </td>
    </tr>