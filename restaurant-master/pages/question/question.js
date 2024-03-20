Page({
  data: {
    currentQuestion: 0,
    totalScore: 0,
    questions: [
      "Question 1: How do you usually handle stress?",
      "Question 2: How do you prefer to spend your free time?",
      "Question 3: What is your attitude towards change?",
      "Question 4: How do you typically react to criticism?",
      "Question 5: What is your approach to problem-solving?"
    ],
    options: ["A", "B", "C", "D"]
  },

  selectOption: function (event) {
    const selectedOption = event.currentTarget.dataset.option;
    const score = this.data.options.length - this.data.options.indexOf(selectedOption);
    this.setData({
      totalScore: this.data.totalScore + score
    });

    // Automatically go to the next question
    this.nextQuestion();
  },

  nextQuestion: function () {
    const nextQuestionIndex = this.data.currentQuestion + 1;
    if (nextQuestionIndex < this.data.questions.length) {
      this.setData({
        currentQuestion: nextQuestionIndex
      });
    } else {
      // Determine the result page based on the total score
      let resultPage = '';
      if (this.data.totalScore >= 18 && this.data.totalScore <= 20) {
        resultPage = '/pages/high_score/high_score';
      } else if (this.data.totalScore >= 14 && this.data.totalScore <= 17) {
        resultPage = '/pages/second_high_score/second_high_score';
      } else if (this.data.totalScore >= 9 && this.data.totalScore <= 13) {
        resultPage = '/pages/third_high_score/third_high_score';
      } else {
        resultPage = '/pages/low_score/low_score';
      }
      
      // Navigate to the result page
      wx.navigateTo({
        url: resultPage + '?totalScore=' + this.data.totalScore
      });
    }
  }
});
