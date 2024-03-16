import React from 'react';

const MediaItemCreate = () => (
  <div>
    <h2>Create Media Item</h2>
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Description:
        <input type="text" name="description" />
      </label>
      <label>
        Category:
        <input type="text" name="category" />
      </label>
      {/* Añade más campos según sea necesario */}
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default MediaItemCreate;
