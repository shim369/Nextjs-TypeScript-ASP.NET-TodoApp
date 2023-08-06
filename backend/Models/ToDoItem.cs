using System;

namespace backend.Models
{
    public class ToDoItem
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Url { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsComplete { get; set; }
    }
}