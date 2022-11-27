import React from 'react';

function Dashboard() {
  return (
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Electorates</p>
          <p class="title">3,456</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Referendums</p>
          <p class="title">34</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Campaigns</p>
          <p class="title">4</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Pledgers</p>
          <p class="title">789</p>
        </div>
      </div>
    </nav>
  );
}

export default Dashboard;
