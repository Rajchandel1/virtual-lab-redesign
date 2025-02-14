document.addEventListener('DOMContentLoaded', () => {
  const demoContainer = document.getElementById('bubble-sort-demo');

  // Function to generate a random array of numbers
  function generateRandomArray(size = 10, max = 100) {
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(Math.floor(Math.random() * max) + 1);
    }
    return array;
  }

  // Function to visualize the array as bars
  function visualizeArray(array, highlight = [], sorted = []) {
    let barsHTML = array.map((value, index) => {
      let barClass = 'bar';
      if (highlight.includes(index)) {
        barClass += ' highlight';
      }
      if (sorted.includes(index)) {
        barClass += ' sorted';
      }
      return `<div class="${barClass}" style="height: ${value}%" data-value="${value}"></div>`;
    }).join('');

    return `<div class="array-bars">${barsHTML}</div>`;
  }

  // Function to perform a single step of bubble sort and visualize it
  async function bubbleSortStep(array, i, j) {
    // Highlight the elements being compared
    const highlight = [j, j + 1];
    demoContainer.innerHTML = visualizeArray(array, highlight);
    await delay(500); // Short delay for visualization

    if (array[j] > array[j + 1]) {
      // Swap elements
      [array[j], array[j + 1]] = [array[j + 1], array[j]];
      demoContainer.innerHTML = visualizeArray(array, highlight);
      await delay(500); // Delay after swap
    }
    return array;
  }

  // Main function to run the bubble sort animation
  async function runBubbleSort(array) {
    let n = array.length;
    let sortedIndices = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        array = await bubbleSortStep(array, i, j);
      }
      // Mark the last element in the inner loop as sorted
      sortedIndices.push(n - 1 - i);
    }

    // Final sorted array visualization
    demoContainer.innerHTML = visualizeArray(array, [], sortedIndices);
  }


  // Utility function to introduce delay
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Initialize the visualization with a random array
  let initialArray = generateRandomArray(10, 80); // Reduced max value for better visualization
  demoContainer.innerHTML = visualizeArray(initialArray);

  // Add a button to start the sorting process
  const startButton = document.createElement('button');
  startButton.textContent = 'Start Bubble Sort';
  startButton.classList.add('start-button');
  demoContainer.appendChild(startButton);

  // Event listener for the start button
  startButton.addEventListener('click', () => {
    startButton.disabled = true; // Disable the button during sorting
    runBubbleSort([...initialArray]) // Pass a copy to prevent modifying the original array
      .then(() => {
        startButton.disabled = false; // Re-enable the button after sorting is complete
        startButton.textContent = 'Re-run Bubble Sort'; // Change button text for re-running
        initialArray = generateRandomArray(10, 80); // Generate new array
        demoContainer.innerHTML = visualizeArray(initialArray); // Show new array
        demoContainer.appendChild(startButton); // Re-append the button to the container
      });
  });

  // CSS for the array bars and start button
  const style = document.createElement('style');
  style.textContent = `
    #bubble-sort-demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .array-bars {
      display: flex;
      gap: 5px;
      margin-bottom: 20px;
    }

    .bar {
      width: 25px;
      background-color: #16a34a;
      transition: height 0.3s ease, background-color 0.3s ease;
      border-radius: 4px 4px 0 0;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      color: white;
      font-size: 0.7em;
    }

    .bar.highlight {
      background-color: #dc2626; /* Red for highlighting */
    }

    .bar.sorted {
      background-color: #059669; /* Green for sorted */
    }

    .start-button {
      padding: 10px 20px;
      background-color: #16a34a;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .start-button:hover {
      background-color: #059669;
    }

    .start-button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);
});